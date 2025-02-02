import { supabase } from "@/lib/supabase";
import yahooFinance from "yahoo-finance2";

export async function rollbackAccuracy() {
  try {
    const { error } = await supabase
      .from('sentiments')
      .update({ is_accurate: null })
      .eq('is_accurate', false)
      .gte('created_at', '2025-01-29')
      .lte('created_at', '2025-02-01');

    if (error) throw error;
  } catch (error) {
    console.error('롤백 실패:', error);
  }
}

export async function verifyPastSentiments(): Promise<void> {
  try {
    // is_accurate가 null인 데이터 조회
    const { data: sentiments, error } = await supabase
      .from('sentiments')
      .select('*')
      .is('is_accurate', null)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    console.log(`검증할 데이터 수: ${sentiments?.length}`);

    for (const sentiment of sentiments || []) {
      try {
        console.log(`[${sentiment.stock_id}] ${sentiment.created_at} 데이터 검증 시작...`);

        // 다음 날짜 계산
        const predictionDate = new Date(sentiment.created_at);
        const nextTradingDay = new Date(predictionDate);
        nextTradingDay.setDate(nextTradingDay.getDate() + 1);

        const day1 = new Date(nextTradingDay);
        const day2 = new Date(nextTradingDay);
        day2.setDate(day2.getDate() + 1);

        const period1Timestamp = Math.floor(day1.getTime() / 1000);
        const period2Timestamp = Math.floor(day2.getTime() / 1000);


        // 해당 날짜의 주가 데이터 조회
        const quote = await yahooFinance.historical(sentiment.stock_id, {
          period1: period1Timestamp,
          period2: period2Timestamp,
          interval: '1d', // 일간 데이터
        })
        console.log(quote);
        // @ts-expect-error 타입 에러
        const priceChangePercent = quote[0].regularMarketChangePercent;

        console.log(`[${sentiment.stock_id}] ${nextTradingDay.toISOString().split('T')[0]} 주가 변동률: ${priceChangePercent}%`);

        // 예측 정확도 검증
        const isAccurate = (sentiment.sentiment > 0 && priceChangePercent > 0) || 
                          (sentiment.sentiment < 0 && priceChangePercent < 0);

        // DB 업데이트
        await supabase
          .from('sentiments')
          .update({ is_accurate: isAccurate })
          .eq('id', sentiment.id);

        console.log(`[${sentiment.stock_id}] 검증 완료 - 예측 ${isAccurate ? '성공' : '실패'}`);

      } catch (error) {
        console.error(`[${sentiment.stock_id}] 검증 실패:`, error);
      }
    }
  } catch (error) {
    console.error('과거 감정 분석 검증 실패:', error);
    throw error;
  }
}