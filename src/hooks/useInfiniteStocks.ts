import { useInfiniteQuery } from '@tanstack/react-query';

const MAX_PAGE = 3; // 최대 페이지 수

export function useInfiniteStocks() {
  return useInfiniteQuery({
    queryKey: ['infiniteStocks'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/stocks?page=${pageParam}`);
      if (!response.ok) throw new Error('API 요청 실패');
      return response.json();
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