import { supabase } from "@/lib/supabase";
import { Sentiment } from "@/types/sentiment";

export async function getTodaySentiments(stockId?: string): Promise<Sentiment[]> {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    today.setDate(today.getDate() - 1);
    const yesterdayStr = today.toISOString().split('T')[0];
    
    let query = supabase
      .from('sentiments')
      .select('*')
      .gte('created_at', todayStr)
      .order('created_at', { ascending: false });

    // stockId가 있으면 필터 추가
    if (stockId !== undefined) {
      query = query.eq('stock_id', stockId);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (data.length === 0) {
      let yesterdayQuery = supabase
        .from('sentiments')
        .select('*')
        .gte('created_at', yesterdayStr)
        .order('created_at', { ascending: false });

      // stockId가 있으면 어제 데이터에도 필터 추가
      if (stockId !== undefined) {
        yesterdayQuery = yesterdayQuery.eq('stock_id', stockId);
      }

      const { data: yesterdayData, error: yesterdayError } = await yesterdayQuery;

      if (yesterdayError) throw yesterdayError;
      return yesterdayData || [];
    }
    
    return data || [];
  } catch (error) {
    console.error('감정 점수 조회 실패:', error);
    throw error;
  }
}