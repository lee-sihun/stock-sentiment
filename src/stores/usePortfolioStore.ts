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
      portfolioSymbols: [],
      isPortfolioMode: false,
      togglePortfolio: (symbol: string) =>
        set((state) => ({
          portfolioSymbols: state.portfolioSymbols.includes(symbol)
            ? state.portfolioSymbols.filter((s) => s !== symbol)
            : [...state.portfolioSymbols, symbol],
        })),
      setPortfolioMode: (isActive: boolean) =>
        set({ isPortfolioMode: isActive }),
      isInPortfolio: (symbol: string) =>
        get().portfolioSymbols.includes(symbol),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);