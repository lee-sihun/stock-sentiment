import { supabase } from "@/lib/supabase";
import { Sentiment } from "@/types/sentiment";

export async function getTodaySentiments(): Promise<Sentiment[]> {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    today.setDate(today.getDate() - 1);
    const yesterdayStr = today.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('sentiments')
      .select('*')
      .gte('created_at', todayStr)
      .order('created_at', { ascending: false });

    // console.log('Today Data:', data);
    if (error) throw error;

    if (data.length === 0) {
      const { data: yesterdayData, error: yesterdayError } = await supabase
        .from('sentiments')
        .select('*')
        .gte('created_at', yesterdayStr)
        .order('created_at', { ascending: false });

      // console.log('Yesterday Data:', yesterdayData);
      if (yesterdayError) throw yesterdayError;
      return yesterdayData || [];
    }
    
    return data || [];
  } catch (error) {
    console.error('감정 점수 조회 실패:', error);
    throw error;
  }
}