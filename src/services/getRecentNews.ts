import { supabase } from "@/lib/supabase";
import { NewsArticle } from "@/types/news";

export async function getRecentNews(symbol: string): Promise<NewsArticle[]> {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    today.setDate(today.getDate() - 1);
    const yesterdayStr = today.toISOString().split('T')[0];
    
    // 오늘 데이터 조회
    const query = supabase
      .from('news')
      .select('*')
      .eq('stock_id', symbol)
      .gte('created_at', todayStr)
      .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    // 오늘 데이터가 없으면 어제 데이터 조회
    if (data.length === 0) {
      const { data: yesterdayData, error: yesterdayError } = await supabase
        .from('news')
        .select('*')
        .eq('stock_id', symbol)
        .gte('created_at', yesterdayStr)
        .order('created_at', { ascending: false });

      if (yesterdayError) throw yesterdayError;
      return yesterdayData || [];
    }
    
    return data || [];
  } catch (error) {
    console.error('뉴스 데이터 조회 실패:', error);
    throw error;
  }
}