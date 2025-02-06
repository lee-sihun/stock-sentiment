import { supabase } from "@/lib/supabase";

// 즐겨찾기 추가
export async function addFavorite(user_email: string, stock_symbol: string) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_email, stock_symbol }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('즐겨찾기 추가 실패:', error);
    throw error;
  }
}

// 즐겨찾기 삭제
export async function removeFavorite(user_email: string, stock_symbol: string) {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_email, stock_symbol });

    if (error) throw error;
  } catch (error) {
    console.error('즐겨찾기 삭제 실패:', error);
    throw error;
  }
}

// 사용자의 즐겨찾기 목록 조회
export async function getFavorites(user_email: string) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_email', user_email);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('즐겨찾기 목록 조회 실패:', error);
    throw error;
  }
}

// 특정 종목이 즐겨찾기되어 있는지 확인
export async function isFavorite(user_email: string, stock_symbol: string) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .match({ user_email, stock_symbol })
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('즐겨찾기 확인 실패:', error);
    throw error;
  }
}