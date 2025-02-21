import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Stock } from '@/types/stock';

const MAX_PAGE = 3; // 최대 페이지 수

export function useInfiniteStocks() {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ['infiniteStocks'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/stocks?page=${pageParam}`);
      if (!response.ok) throw new Error('API 요청 실패');
      const stocks: Stock[] = await response.json();
      
      // 각 주식 데이터를 개별적으로 캐시에 저장
      stocks.forEach((stock) => {
        queryClient.setQueryData(['stocks', stock.symbol], stock);
      });
      
      return stocks;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length >= MAX_PAGE) return undefined;
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });
}