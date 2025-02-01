import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { Sentiment } from '@/types/sentiment';

export function useTodaySentiments() {
  return useQuery({
    queryKey: ['todaySentiments'],
    queryFn: async () => {
      const response = await axiosInstance.get<{ sentiments: Sentiment[] }>('/sentiments/today');
      return response.data.sentiments;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });
}