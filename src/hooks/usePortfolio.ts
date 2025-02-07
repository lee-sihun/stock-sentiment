import { useSession } from 'next-auth/react';
import { useFavorites, useFavoriteMutation } from './useFavorites';
import { usePortfolioStore } from '@/stores/usePortfolioStore';

export function usePortfolio() {
  const { data: session } = useSession();
  const { data: favorites } = useFavorites();
  const { addFavorite, removeFavorite } = useFavoriteMutation();
  const portfolioStore = usePortfolioStore();

  // 로그인 상태에 따라 다른 값 반환
  return {
    portfolioSymbols: session 
      ? favorites?.map(f => f.stock_symbol) ?? []
      : portfolioStore.portfolioSymbols,
    isPortfolioMode: portfolioStore.isPortfolioMode,
    setPortfolioMode: portfolioStore.setPortfolioMode,
    isInPortfolio: (symbol: string) => 
      session
        ? favorites?.some(f => f.stock_symbol === symbol) ?? false
        : portfolioStore.isInPortfolio(symbol),
    togglePortfolio: async (symbol: string) => {
      if (session) {
        const isBookmarked = favorites?.some(f => f.stock_symbol === symbol);
        if (isBookmarked) {
          await removeFavorite.mutateAsync(symbol);
        } else {
          await addFavorite.mutateAsync(symbol);
        }
      } else {
        portfolioStore.togglePortfolio(symbol);
      }
    }
  };
}