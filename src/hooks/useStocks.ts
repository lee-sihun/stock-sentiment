import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { Stock } from '@/types/stock';

export function useStocks(options?: Partial<UseQueryOptions<Stock[], Error>>) {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      const response = await axiosInstance.get<Stock[]>('/stocks');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    ...options
  });
}