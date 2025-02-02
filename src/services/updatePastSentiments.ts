import { supabase } from "@/lib/supabase";

export async function updatePastSentiments(): Promise<void> {
  try {
    const { data: stocks, error: stocksError } = await supabase
      .from('stocks')
      .select('symbol')
      .order('rank');

    if (stocksError) throw stocksError;

    for (const stock of stocks) {
      try {
        // 해당 종목의 모든 날짜의 뉴스 데이터 조회
        const { data: newsGroups, error: newsError } = await supabase
          .from('news')
          .select('created_at, sentiment')
          .eq('stock_id', stock.symbol);

        if (newsError) throw newsError;
        if (!newsGroups || newsGroups.length === 0) {
          console.log(`${stock.symbol}: 뉴스 데이터 없음`);
          continue;
        }

        // 날짜별로 뉴스 그룹화
        const newsByDate = newsGroups.reduce((acc, news) => {
          const date = news.created_at.split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(news);
          return acc;
        }, {} as Record<string, typeof newsGroups>);

        // 각 날짜별로 sentiment 계산 및 업데이트
        for (const [date, news] of Object.entries(newsByDate)) {
          const positiveCount = news.filter(article => article.sentiment === 1).length;
          const neutralCount = news.filter(article => article.sentiment === 0).length;
          const negativeCount = news.filter(article => article.sentiment === -1).length;

          const maxCount = Math.max(positiveCount, neutralCount, negativeCount);
          const totalSentiment = 
            maxCount === positiveCount ? 1 :
            maxCount === negativeCount ? -1 : 0;

          const { error: updateError } = await supabase
            .from('sentiments')
            .update({ sentiment: totalSentiment })
            .eq('stock_id', stock.symbol)
            .eq('created_at', date);

          if (updateError) {
            console.error(`${stock.symbol} ${date} 업데이트 실패:`, updateError);
            continue;
          }

          console.log(`${stock.symbol} ${date} 감정 점수 업데이트 완료: ${totalSentiment}`);
        }
      } catch (error) {
        console.error(`${stock.symbol} 처리 중 오류:`, error);
      }
    }
  } catch (error) {
    console.error('과거 데이터 업데이트 실패:', error);
    throw error;
  }
}