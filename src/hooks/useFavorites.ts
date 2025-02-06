import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axios';
import { Favorite } from '@/types/favorites';

export function useFavorites(options?: Partial<UseQueryOptions<Favorite[], Error>>) {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await axiosInstance.get<Favorite[]>('/favorites/list');
      return response.data;
    },
    enabled: !!session?.user?.email,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options
  });
}

export function useFavoriteMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const addFavorite = useMutation({
    mutationFn: async (symbol: string) => {
      const response = await axiosInstance.post<Favorite>('/favorites', {
        stock_symbol: symbol
      });
      return response.data;
    },
    onMutate: async (symbol) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] }); // 쿼리 취소로 race condition 방지 
      const previousFavorites = queryClient.getQueryData<Favorite[]>(['favorites']); // 이전 상태(캐시된 데이터) 저장
      
      // 캐시 된 데이터를 즉시 업데이트해서 사용자 피드백 
      queryClient.setQueryData<Favorite[]>(['favorites'], (old = []) => [
        ...old,
        { stock_symbol: symbol, user_email: session?.user?.email ?? '' }
      ]);

      return { previousFavorites }; // 요청 실패 시 이전 상태로 롤백하기 위해 반환
    },
    // 에러 발생 시 이전 상태로 롤백
    onError: (_, __, context) => {
      queryClient.setQueryData(['favorites'], context?.previousFavorites);
    },
    // 데이터 동기화 
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const removeFavorite = useMutation({
    mutationFn: async (symbol: string) => {
      const response = await axiosInstance.delete<{ success: boolean }>('/favorites', {
        data: { stock_symbol: symbol }
      });
      return response.data;
    },
    onMutate: async (symbol) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previousFavorites = queryClient.getQueryData<Favorite[]>(['favorites']);
      
      queryClient.setQueryData<Favorite[]>(['favorites'], (old = []) => 
        old.filter(fav => fav.stock_symbol !== symbol)
      );

      return { previousFavorites };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['favorites'], context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  return { addFavorite, removeFavorite };
}