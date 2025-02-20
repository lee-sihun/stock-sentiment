export interface Stock {
  rank: number;
  symbol: string;
  name: string;
  exchange?: string | null;
  current_price?: number | null;
  volume?: number | null;
  market_cap?: number | null;
  sentiment?: number | null;
}