import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteStocks() {
  return useInfiniteQuery({
    queryKey: ['infiniteStocks'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/stocks?page=${pageParam}`);
      if (!response.ok) throw new Error('API 요청 실패');
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === 10 ? lastPage[lastPage.length - 1].rank / 10 : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });
}