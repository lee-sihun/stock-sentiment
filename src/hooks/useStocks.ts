import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { Stock } from '@/types/stock';

export function useStocks() {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      const response = await axiosInstance.get<Stock[]>('/stocks');
      return response.data;
    }
  });
}