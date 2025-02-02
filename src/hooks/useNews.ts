import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { NewsArticle } from '@/types/news';

export function useNews(
  symbol: string,
  options?: Partial<UseQueryOptions<NewsArticle[], Error>>
) {
  return useQuery({
    queryKey: ['news', symbol],
    queryFn: async () => {
      const response = await axiosInstance.get<NewsArticle[]>(`/news/${symbol}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!symbol,
    ...options
  });
}