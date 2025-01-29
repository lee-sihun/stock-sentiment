import { supabase } from "@/lib/supabase";
import { analyzeHeadlines } from "./analyzeHeadlines";

export async function updateNewsSentiment(): Promise<void> {
  try {
    // stocks 테이블 조회
    const { data: stocks, error: stocksError } = await supabase
      .from('stocks')
      .select('symbol, name')
      .order('rank');

    if (stocksError) throw stocksError;

    // 각 종목별로 처리
    for (const stock of stocks) {
      try {
        // 오늘 날짜의 뉴스 조회
        const today = new Date().toISOString().split('T')[0];
        const { data: news, error: newsError } = await supabase
          .from('news')
          .select('id, headline')
          .eq('stock_id', stock.symbol)
          .gte('created_at', today);

        if (newsError) throw newsError;
        if (!news || news.length === 0) continue;

        // 감정 분석 수행
        const headlines = news.map(article => article.headline);
        const sentimentValues = await analyzeHeadlines(stock.name, headlines);

        // 분석 결과 업데이트
        for (let i = 0; i < news.length; i++) {
          if (sentimentValues[i] === undefined) {
            console.warn(`${stock.symbol}: 인덱스 ${i}의 sentiment 값이 없음, 기본값 0으로 설정`);
            sentimentValues[i] = 0;
          }

          const { error: updateError } = await supabase
            .from('news')
            .update({ sentiment: sentimentValues[i] })
            .eq('id', news[i].id);

          if (updateError) throw updateError;
        }

        console.log(`${stock.symbol} 뉴스 감정 분석 완료`);
      } catch (error) {
        console.error(`${stock.symbol} 처리 중 오류:`, error);
      }
    }
  } catch (error) {
    console.error('뉴스 감정 분석 실패:', error);
    throw error;
  }
}