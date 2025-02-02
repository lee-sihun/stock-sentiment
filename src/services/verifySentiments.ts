import { supabase } from "@/lib/supabase";
import yahooFinance from "yahoo-finance2";

export async function verifySentiments(): Promise<void> {
  try {
    // 어제 날짜의 감정 분석 데이터 조회
    const now = new Date();
    now.setUTCDate(now.getUTCDate() - 1);

    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)).toISOString();
    const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999)).toISOString();
    
    const { data: sentiments, error } = await supabase
      .from('sentiments')
      .select('*')
      .gte('created_at', startOfDayUTC)
      .lte('created_at', endOfDayUTC);

    if (error) throw error;

    for (const sentiment of sentiments) {
      try {
        // 주가 변동률 
        const quote = await yahooFinance.quote(sentiment.stockId);
        // @ts-expect-error 타입 에러
        const priceChangePercent = quote.regularMarketChangePercent;

        // 예측 정확도 검증
        const isAccurate = (sentiment.sentiment > 0 && priceChangePercent > 0) || 
                          (sentiment.sentiment < 0 && priceChangePercent < 0);

        await supabase
          .from('sentiments')
          .update({ 
            isAccurate,
          })
          .eq('id', sentiment.id);

      } catch (error) {
        console.error(`${sentiment.stockId} 검증 실패:`, error);
      }
    }
  } catch (error) {
    console.error('감정 분석 검증 실패:', error);
    throw error;
  }
}