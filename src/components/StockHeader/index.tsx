"use client";
import { useStocks } from "@/hooks/useStocks";
import { formatKRW, formatUSD } from "@/utils/formatNumber";
import Info from "@public/svgs/info.svg";
import Star from "@public/svgs/star.svg";
import StockHeaderSkeleton from "./StockHeaderSkeleton";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function StockHeader({ symbol }: { symbol: string }) {
  const { togglePortfolio, isInPortfolio } = usePortfolio();
  const isBookmarked = isInPortfolio(symbol);
  const { data: stock, isLoading } = useStocks(symbol);

  if (isLoading) return <StockHeaderSkeleton />;

  return (
    <section className="mt-[77px] flex justify-between items-end border-b border-[rgba(217,217,217,0.2)] text-white">
      <div className="flex flex-col gap-[2px] mb-[16px]">
        <div className="flex items-center gap-[4px]">
          <h3 className="text-[20px] font-semibold leading-[24px]">
            {stock?.name}
          </h3>
          <span className="flex justify-center items-center h-[19px] px-[6px] bg-[#010003] border border-[rgba(255,255,255,0.2)] rounded-[4px] text-[12px] font-medium text-[#AAAFBE]">
            {stock?.symbol}
          </span>
          <span className="flex justify-center items-center h-[19px] px-[6px] bg-[#010003] border border-[rgba(255,255,255,0.2)] rounded-[4px] text-[12px] font-medium text-[#AAAFBE]">
            {stock?.exchange}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[36px] font-bold leading-[43px]">
            {formatKRW(stock?.current_price ?? 0, true)}
          </span>
          <span className="text-[22px] font-medium text-[#AAAFBE] max-[1248px]:hidden">
            ${formatUSD(stock?.current_price ?? 0)}
          </span>
        </div>
      </div>
      <div className="flex gap-[10px] mb-[24px]">
        <button
          onClick={() =>
            window.open(`https://finance.yahoo.com/quote/${symbol}/`, "_blank")
          }
          className="flex gap-[8px] items-center justify-center h-[38px] px-[16px] bg-[#22222A] rounded-[8px] text-[14px] font-medium leading-[17px]"
        >
          <Info />
          <span className="max-[1248px]:hidden">상세 정보</span>
        </button>
        <button
          onClick={() => togglePortfolio(symbol)}
          className="flex gap-[8px] items-center justify-center h-[38px] px-[16px] bg-[#22222A] rounded-[8px] text-[14px] font-medium leading-[17px]"
        >
          <Star fill={isBookmarked ? "#FFD900" : "white"} />
          <span className="max-[1248px]:hidden">포트폴리오</span>
        </button>
      </div>
    </section>
  );
}
