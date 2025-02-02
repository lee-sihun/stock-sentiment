import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { Sentiment } from '@/types/sentiment';

export function useSentiments(symbol: string) {
  return useQuery({
    queryKey: ['sentiments', symbol],
    queryFn: async () => {
      const response = await axiosInstance.get<Sentiment[]>(`/sentiments/${symbol}`);
      return response.data;
    },
    enabled: !!symbol
  });
}