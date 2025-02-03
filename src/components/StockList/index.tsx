"use client";
import Star from "@public/svgs/star.svg";
import Arrow from "@public/svgs/arrow.svg";
import StockListItem from "./StockListItem";
import { useStocks } from "@/hooks/useStocks";
import { STOCK_COUNT } from "@/config/constants";
import StockListItemSkeleton from "./StockListItemSkeleton";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function StockList() {
  return (
    <section className="mt-[68px]">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h3 className="text-white text-[32px] font-bold">분석 중인 종목</h3>
          <p className="text-white text-[16px] font-medium">
            현재 시장에서 주목할 만한 핵심 종목
          </p>
        </div>
        <PortfolioToggle />
      </div>
      <ul className="flex flex-col w-full text-white text-[15px] font-semibold">
        <div className="flex w-full h-[42px] mt-[22px] border-t border-[#D9D9D9]/20">
          <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center">
            <Arrow />
          </div>
          <div className="h-full flex-1 shrink basis-[507px] flex items-center pl-[24px]">
            종목
          </div>
          <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end">
            현재 주가
          </div>
          <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end">
            정규시장 거래대금
          </div>
          <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px]">
            시가총액
          </div>
        </div>
        <ItemsContainer />
      </ul>
    </section>
  );
}

function PortfolioToggle() {
  const { isPortfolioMode, setPortfolioMode } = usePortfolioStore();

  return (
    <button
      className="flex items-center gap-[8px] h-[38px] bg-[#22222A] px-[16px] rounded-lg text-white text-[14px] font-medium"
      onClick={() => setPortfolioMode(!isPortfolioMode)}
    >
      <Star fill={isPortfolioMode ? "#FFD900" : "white"} />
      포트폴리오
    </button>
  );
}

function ItemsContainer() {
  const { isPortfolioMode, portfolioSymbols } = usePortfolioStore();
  const { data, isLoading } = useStocks();

  if (isLoading)
    return (
      <div className="flex flex-col w-full gap-[12px]">
        {Array.from({ length: STOCK_COUNT.STOCK_COUNT }).map((_, index) => (
          <StockListItemSkeleton key={index} />
        ))}
      </div>
    );

  let filteredStocks = [...(data || [])]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, STOCK_COUNT.STOCK_COUNT - 1);

  if (isPortfolioMode) {
    filteredStocks = filteredStocks.filter((stock) =>
      portfolioSymbols.includes(stock.symbol)
    );
  }

  return (
    <div className="flex flex-col w-full gap-[12px]">
      {filteredStocks.map((stock) => (
        <StockListItem key={stock.rank} stock={stock} />
      ))}
    </div>
  );
}
