import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSession } from 'next-auth/react';
import { useFavorites, useFavoriteMutation } from '@/hooks/useFavorites';

interface PortfolioState {
  portfolioSymbols: string[];
  isPortfolioMode: boolean;
  togglePortfolio: (symbol: string) => void;
  setPortfolioMode: (isActive: boolean) => void;
  isInPortfolio: (symbol: string) => boolean;
}

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

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      portfolioSymbols: [],
      isPortfolioMode: false,

      // 심볼 토글  
      togglePortfolio: (symbol: string) =>
        set((state) => ({
          portfolioSymbols: state.portfolioSymbols.includes(symbol)
            ? state.portfolioSymbols.filter((s) => s !== symbol)
            : [...state.portfolioSymbols, symbol],
        })),

      // 포트폴리오 모드 토글  
      setPortfolioMode: (isActive: boolean) =>
        set({ isPortfolioMode: isActive }),
      
      // 심볼 존재 여부 체크 
      isInPortfolio: (symbol: string) =>
        get().portfolioSymbols.includes(symbol),
    }),
    {
      name: 'portfolio-storage', // localStorage 키 이름
    }
  )
);