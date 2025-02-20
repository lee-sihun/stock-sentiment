export interface Sentiment {
  stock_id: string;
  sentiment: number;
  is_accurate?: boolean;
  created_at: string;
}