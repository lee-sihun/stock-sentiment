import { getStocks } from "@/services/stocks/getStocks";
import { formatKRW, formatByCurrency } from "@/utils/formatNumber";
import Info from "@public/svgs/info.svg";
import StockHeaderSkeleton from "./StockHeaderSkeleton";
import { unstable_cache } from "next/cache";
import PortfolioButton from "./PortfolioButton";

export default async function StockHeader({ symbol }: { symbol: string }) {
  const stock = await unstable_cache(
    () => getStocks(symbol),
    ["stocks", symbol],
    { revalidate: 300 }
  )();

  if (!stock) return <StockHeaderSkeleton />;

  return (
    <section className="mt-[77px] flex justify-between items-end border-b border-[rgba(217,217,217,0.2)] text-white">
      <div className="flex flex-col gap-[2px] mb-[16px]">
        <div className="flex items-center gap-[4px]">
          <h3 className="text-[20px] font-semibold leading-[24px]">
            {stock.name}
          </h3>
          <span className="flex justify-center items-center h-[19px] px-[6px] bg-[#010003] border border-[rgba(255,255,255,0.2)] rounded-[4px] text-[12px] font-medium text-[#AAAFBE]">
            {stock.symbol}
          </span>
          <span className="flex justify-center items-center h-[19px] px-[6px] bg-[#010003] border border-[rgba(255,255,255,0.2)] rounded-[4px] text-[12px] font-medium text-[#AAAFBE]">
            {stock.exchange}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[36px] font-bold leading-[43px]">
            {formatKRW(stock.current_price_krw ?? 0, true, "KRW")}
          </span>
          <span className="text-[22px] font-medium text-[#AAAFBE] max-[1248px]:hidden">
            {formatByCurrency(stock.current_price ?? 0, stock.currency)}
          </span>
        </div>
      </div>
      <div className="flex gap-[10px] mb-[24px]">
        <a
          href={`https://finance.yahoo.com/quote/${symbol}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-[8px] items-center justify-center h-[38px] px-[16px] bg-[#22222A] rounded-[8px] text-[14px] font-medium leading-[17px]"
        >
          <Info />
          <span className="max-[1248px]:hidden">상세 정보</span>
        </a>
        <PortfolioButton symbol={symbol} />
      </div>
    </section>
  );
}
