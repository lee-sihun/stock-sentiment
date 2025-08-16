export interface Stock {
  rank: number;
  symbol: string;
  name: string;
  exchange?: string | null;
  currency?: string | null;
  current_price?: number | null;
  current_price_krw?: number | null;
  volume?: number | null;
  volume_krw?: number | null;
  market_cap?: number | null;
  market_cap_krw?: number | null;
  sentiment?: number | null;
}