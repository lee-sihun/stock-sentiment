import { supabase } from '@/lib/supabase';
import { Stock } from '@/types/stock';
import yahooFinance from 'yahoo-finance2';
import { getTodaySentiments } from '../sentiments/getTodaySentiments';

export async function getStocks(symbol: string): Promise<Stock> {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('symbol', symbol)
      .single();

    if (error) throw error;

    try {
      const [quote, sentiment] = await Promise.all([
        yahooFinance.quote(data.symbol),
        getTodaySentiments(data.symbol)
      ]);

      return {
        rank: data.rank,
        symbol: data.symbol,
        name: data.name,
        // @ts-expect-error 타입에러
        exchange: quote.fullExchangeName,
        // @ts-expect-error 타입에러
        current_price: quote.regularMarketPrice,
        // @ts-expect-error 타입에러
        volume: quote.regularMarketVolume * quote.regularMarketPrice,
        // @ts-expect-error 타입에러
        market_cap: quote.marketCap,
        sentiment: sentiment[0]["sentiment"]
      };
    } catch (error) {
      console.error(`Failed to fetch data for ${symbol}:`, error);
      return {
        rank: data.rank,
        symbol: data.symbol,
        name: data.name,
        exchange: null,
        current_price: null,
        volume: null,
        market_cap: null,
        sentiment: null
      };
    }
  } catch (error) {
    console.error('주식 데이터 조회 실패:', error);
    throw error;
  }
}

export async function getStocksByPage(pageParam: number = 0): Promise<Stock[]> {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('rank', { ascending: true })
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);

    if (error) throw error;

    const enrichedStocks = await Promise.all(
      data.map(async (stock) => {
        try {
          const [quote, sentiment] = await Promise.all([
            yahooFinance.quote(stock.symbol),
            getTodaySentiments(stock.symbol)
          ]);

          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            // @ts-expect-error 타입에러
            exchange: quote.fullExchangeName,
            // @ts-expect-error 타입에러
            current_price: quote.regularMarketPrice,
            // @ts-expect-error 타입에러
            volume: quote.regularMarketVolume * quote.regularMarketPrice,
            // @ts-expect-error 타입에러
            market_cap: quote.marketCap,
            sentiment: sentiment[0]["sentiment"]
          };
        } catch (error) {
          console.error(`Failed to fetch data for ${stock.symbol}:`, error);
          // 에러 발생시 기본 데이터만 반환
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            exchange: null,
            current_price: null,
            volume: null,
            market_cap: null,
            sentiment: null
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

export async function getStocksList(): Promise<Stock[]> {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('rank', { ascending: true });

    if (error) throw error;

    const enrichedStocks = await Promise.all(
      data.map(async (stock) => {
        try {
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
          };
        } catch (error) {
          console.error(`Failed to fetch data for ${stock.symbol}:`, error);
          // 에러 발생시 기본 데이터만 반환
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
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