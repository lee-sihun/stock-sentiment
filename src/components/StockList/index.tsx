"use client";
import { useEffect } from "react";
import Star from "@public/svgs/star.svg";
import Arrow from "@public/svgs/arrow.svg";
import StockListItem from "./StockListItem";
import { useInfiniteStocks } from "@/hooks/useInfiniteStocks";
import { useInView } from "react-intersection-observer";
import { STOCK_COUNT } from "@/config/constants";
import StockListItemSkeleton from "./StockListItemSkeleton";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function StockList() {
  const { isPortfolioMode } = usePortfolio();

  return (
    <section className="mt-[68px] max-[1248px]:mt-[74px]">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h3 className="text-white text-[32px] max-[1248px]:text-[24px] font-bold">
            분석 중인 종목
          </h3>
          <p className="text-white text-[16px] max-[1248px]:text-[14px] font-medium">
            {isPortfolioMode
              ? "내가 주목하고 있는 핵심 종목"
              : "현재 시장에서 주목할 만한 핵심 종목"}
          </p>
        </div>
        <PortfolioToggle />
      </div>
      <ul className="flex flex-col w-full text-white text-[15px] font-semibold">
        <div className="flex w-full h-[42px] mt-[22px] border-t border-[#D9D9D9]/20">
          <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center max-[1248px]:hidden">
            <Arrow />
          </div>
          <div className="h-full flex-1 shrink basis-[507px] flex items-center pl-[24px]">
            종목
          </div>
          <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end max-[1248px]:mr-[24px]">
            현재 주가
          </div>
          <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end max-[1248px]:hidden">
            정규시장 거래대금
          </div>
          <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px] max-[1248px]:hidden">
            시가총액
          </div>
        </div>
        <ItemsContainer />
      </ul>
    </section>
  );
}

function PortfolioToggle() {
  const { isPortfolioMode, setPortfolioMode } = usePortfolio();

  return (
    <button
      className="flex items-center gap-[8px] h-[38px] bg-[#22222A] px-[16px] rounded-lg text-white text-[14px] font-medium"
      onClick={() => setPortfolioMode(!isPortfolioMode)}
    >
      <Star fill={isPortfolioMode ? "#FFD900" : "white"} />
      <span className="max-[1248px]:hidden">포트폴리오</span>
    </button>
  );
}

function ItemsContainer() {
  const { ref, inView } = useInView({
    rootMargin: "100px 0px" 
  });
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteStocks();
  const { isPortfolioMode, portfolioSymbols } = usePortfolio();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="flex flex-col w-full gap-[12px]">
        {Array.from({ length: STOCK_COUNT.STOCK_COUNT }).map((_, index) => (
          <StockListItemSkeleton key={index} />
        ))}
      </div>
    );

  const stocks = data?.pages.flatMap((page) => page) ?? [];
  let filteredStocks = [...stocks].sort((a, b) => a.rank - b.rank);

  // let filteredStocks = [...(data || [])]
  //   .sort((a, b) => a.rank - b.rank)
  //   .slice(0, STOCK_COUNT.STOCK_COUNT - 1);

  if (isPortfolioMode) {
    filteredStocks = filteredStocks.filter((stock) =>
      portfolioSymbols.includes(stock.symbol)
    );
  }

  return (
    <div className="flex flex-col w-full gap-[12px]">
      {filteredStocks.map((stock, index) => (
        <StockListItem key={stock.rank} stock={stock} index={index} />
      ))}
      {isFetchingNextPage && !isPortfolioMode && (
        <div className="flex flex-col gap-[12px]">
          {Array.from({ length: STOCK_COUNT.STOCK_COUNT }).map((_, index) => (
            <StockListItemSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}
      {!hasNextPage && !isPortfolioMode && (
        <div className="text-center text-white text-[16px] font-medium mt-4 mb-[-18px]">
          마지막 페이지입니다.
        </div>
      )}
      <div ref={ref} />
    </div>
  );
}
