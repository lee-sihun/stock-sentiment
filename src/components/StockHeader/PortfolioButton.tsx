"use client";
import { usePortfolio } from "@/hooks/usePortfolio";
import Star from "@public/svgs/star.svg";

export default function PortfolioButton({ symbol }: { symbol: string }) {
  const { togglePortfolio, isInPortfolio } = usePortfolio();
  const isBookmarked = isInPortfolio(symbol);

  return (
    <button
      onClick={() => togglePortfolio(symbol)}
      className="flex gap-[8px] items-center justify-center h-[38px] px-[16px] bg-[#22222A] rounded-[8px] text-[14px] font-medium leading-[17px]"
      aria-pressed={isBookmarked}
      aria-label="포트폴리오 토글"
    >
      <Star fill={isBookmarked ? "#FFD900" : "white"} />
      <span className="max-[1248px]:hidden">포트폴리오</span>
    </button>
  );
}
