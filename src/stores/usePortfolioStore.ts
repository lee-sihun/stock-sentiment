import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  portfolioSymbols: string[];
  isPortfolioMode: boolean;
  togglePortfolio: (symbol: string) => void;
  setPortfolioMode: (isActive: boolean) => void;
  isInPortfolio: (symbol: string) => boolean;
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