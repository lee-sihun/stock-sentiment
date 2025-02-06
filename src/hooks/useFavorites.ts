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

  const addFavorite = useMutation({
    mutationFn: async (symbol: string) => {
      const response = await axiosInstance.post<Favorite>('/favorites', {
        stock_symbol: symbol
      });
      return response.data;
    },
    onSuccess: () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  return { addFavorite, removeFavorite };
}