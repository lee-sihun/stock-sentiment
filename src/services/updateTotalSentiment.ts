import { supabase } from '@/lib/supabase';

export async function updateTotalSentiment(): Promise<void> {
  try {
    // 주식 종목 조회
    const { data: stocks, error: stocksError } = await supabase
      .from('stocks')
      .select('symbol')
      .order('rank');

    if (stocksError) throw stocksError;

    for (const stock of stocks) {
      try {
        // 당일 생성 된 뉴스 조회
        const today = new Date().toISOString().split('T')[0];
        const { data: news, error: newsError } = await supabase
          .from('news')
          .select('sentiment')
          .eq('stock_id', stock.symbol)
          .gte('created_at', today);

        if (newsError) throw newsError;
        if (!news || news.length === 0) {
          console.log(`${stock.symbol}: 오늘 생성된 뉴스 없음`);
          continue;
        }

        // 감정 점수 합산
        const totalSentiment = news.reduce((sum, article) => 
          sum + (article.sentiment || 0), 0);

        const { error: insertError } = await supabase
          .from('sentiments')
          .insert({
            stock_id: stock.symbol,
            sentiment: totalSentiment
          });

        if (insertError) {
          throw new Error(`Insert 실패: ${insertError.message}`);
        }
        
        console.log(`${stock.symbol} 감정 점수 합산 완료: ${totalSentiment}`);
      } catch (error) {
        console.error(`${stock.symbol} 감정 점수 처리 중 오류:`, error);
      }
    }
  } catch (error) {
    console.error('감정 점수 합산 실패:', error);
    throw error;
  }
}