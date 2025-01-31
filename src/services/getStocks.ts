import { supabase } from '@/lib/supabase';
import { Stock } from '@/types/stock';
import yahooFinance from 'yahoo-finance2';

export async function getStocks(): Promise<Stock[]> {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('rank', { ascending: true });

    if (error) throw error;

    const enrichedStocks = await Promise.all(
      data.map(async (stock) => {
        try {
          const quote = await yahooFinance.quote(stock.symbol);
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            // @ts-expect-error 타입에러
            exchange: quote.fullExchangeName,
            // @ts-expect-error 타입에러
            currentPrice: quote.regularMarketPrice,
            // @ts-expect-error 타입에러
            volume: quote.regularMarketVolume * quote.regularMarketPrice,
            // @ts-expect-error 타입에러
            marketCap: quote.marketCap
          };
        } catch (error) {
          console.error(`Failed to fetch data for ${stock.symbol}:`, error);
          // 에러 발생시 기본 데이터만 반환
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            currentPrice: null,
            volume: null,
            marketCap: null
          };
        }
      })
    );

    return enrichedStocks;
  } catch (error) {
    console.error('주식 데이터 조회 실패:', error);
    throw error;
  }
}