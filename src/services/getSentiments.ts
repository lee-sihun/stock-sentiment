import { supabase } from "@/lib/supabase";
import { Sentiment } from "@/types/sentiment";

export async function getSentiments(symbol: string): Promise<Sentiment[]> {
  try {
    const { data, error } = await supabase
      .from('sentiments')
      .select('*')
      .eq('stock_id', symbol)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('감정 데이터 조회 실패:', error);
    throw error;
  }
}