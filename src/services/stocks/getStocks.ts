import { supabase } from "@/lib/supabase";
import { Stock } from "@/types/stock";
import yahooFinance from "yahoo-finance2";
import { getTodaySentiments } from "../sentiments/getTodaySentiments";
import { getExchangeRate } from "@/services/exchange/getExchangeRate";

export async function getStocks(symbol: string): Promise<Stock> {
  try {
    const { data, error } = await supabase
      .from("stocks")
      .select("*")
      .eq("symbol", symbol)
      .single();

    if (error) throw error;

    try {
      const [quote, sentiment] = await Promise.all([
        yahooFinance.quote(data.symbol),
        getTodaySentiments(data.symbol),
      ]);
      // @ts-expect-error 타입에러
      const currency: string | null = quote.currency || null;
      const rate = await getExchangeRate(currency || "USD");
      // @ts-expect-error 타입에러
      const price: number = quote.regularMarketPrice || 0;
      // @ts-expect-error 타입에러
      const volUnits: number = quote.regularMarketVolume || 0;
      const volume = volUnits * price;
      // @ts-expect-error 타입에러
      const marketCap: number = quote.marketCap || 0;

      return {
        rank: data.rank,
        symbol: data.symbol,
        name: data.name,
        // @ts-expect-error 타입에러
        exchange: quote.fullExchangeName,
        currency,
        current_price: price,
        volume,
        market_cap: marketCap,
        current_price_krw: price * rate,
        volume_krw: volume * rate,
        market_cap_krw: marketCap * rate,
        sentiment: sentiment[0]["sentiment"],
      } as Stock;
    } catch (error) {
      console.error(`Failed to fetch data for ${symbol}:`, error);
      return {
        rank: data.rank,
        symbol: data.symbol,
        name: data.name,
        exchange: null,
        currency: null,
        current_price: null,
        current_price_krw: null,
        volume: null,
        volume_krw: null,
        market_cap: null,
        market_cap_krw: null,
        sentiment: null,
      };
    }
  } catch (error) {
    console.error("주식 데이터 조회 실패:", error);
    throw error;
  }
}

export async function getStocksByPage(pageParam: number = 0): Promise<Stock[]> {
  try {
    const { data, error } = await supabase
      .from("stocks")
      .select("*")
      .order("rank", { ascending: true })
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);

    if (error) throw error;

    const enrichedStocks = await Promise.all(
      data.map(async (stock) => {
        try {
          const [quote, sentiment] = await Promise.all([
            yahooFinance.quote(stock.symbol),
            getTodaySentiments(stock.symbol),
          ]);

          // @ts-expect-error 타입에러
          const currency: string | null = quote.currency || null;
          const rate = await getExchangeRate(currency || "USD");
          // @ts-expect-error 타입에러
          const price: number = quote.regularMarketPrice || 0;
          // @ts-expect-error 타입에러
          const volUnits: number = quote.regularMarketVolume || 0;
          const volume = volUnits * price;
          // @ts-expect-error 타입에러
          const marketCap: number = quote.marketCap || 0;

          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            // @ts-expect-error 타입에러
            exchange: quote.fullExchangeName,
            currency,
            current_price: price,
            volume,
            market_cap: marketCap,
            current_price_krw: price * rate,
            volume_krw: volume * rate,
            market_cap_krw: marketCap * rate,
            sentiment: sentiment[0]["sentiment"],
          } as Stock;
        } catch (error) {
          console.error(`Failed to fetch data for ${stock.symbol}:`, error);
          // 에러 발생시 기본 데이터만 반환
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
            exchange: null,
            currency: null,
            current_price: null,
            current_price_krw: null,
            volume: null,
            volume_krw: null,
            market_cap: null,
            market_cap_krw: null,
            sentiment: null,
          };
        }
      })
    );

    return enrichedStocks;
  } catch (error) {
    console.error("주식 데이터 조회 실패:", error);
    throw error;
  }
}

export async function getStocksList(): Promise<Stock[]> {
  try {
    const { data, error } = await supabase
      .from("stocks")
      .select("*")
      .order("rank", { ascending: true });

    if (error) throw error;

    const enrichedStocks = await Promise.all(
      data.map(async (stock) => {
        try {
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
          } as Stock;
        } catch (error) {
          console.error(`Failed to fetch data for ${stock.symbol}:`, error);
          return {
            rank: stock.rank,
            symbol: stock.symbol,
            name: stock.name,
          } as Stock;
        }
      })
    );

    return enrichedStocks;
  } catch (error) {
    console.error("주식 데이터 조회 실패:", error);
    throw error;
  }
}
