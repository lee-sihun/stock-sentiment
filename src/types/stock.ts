export interface Stock {
  rank: number;
  symbol: string;
  name: string;
  currentPrice: number | null;
  volume: number | null;
  marketCap: number | null;
  sentiment: number | null;
}