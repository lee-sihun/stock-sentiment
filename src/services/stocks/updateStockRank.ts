import { supabase } from '@/lib/supabase';
import { getStockRank } from './getStockRank';

export async function updateStockRank(): Promise<void> {
  try {
    const stocks = await getStockRank();

    // 기존 데이터 확인 및 삭제
    const { error: deleteError } = await supabase
      .from('stocks')
      .delete()
      .gte('rank', 0);

    if (deleteError) throw deleteError;

    // 새로운 데이터 삽입
    const formattedStocks = stocks.map(stock => ({
      symbol: stock.symbol,
      rank: stock.rank,
      name: stock.name,
    }));

    const { error: insertError } = await supabase
      .from('stocks')
      .insert(formattedStocks);

    if (insertError) throw insertError;
  } catch (error) {
    console.error('주식 순위 업데이트 실패:', error);
    throw error;
  }
}