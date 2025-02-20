import { formatKRW } from "@/utils/formatNumber";
import { Stock } from "@/types/stock";
import Link from "next/link";

interface StockListItemProps {
  stock: Stock;
  index: number;
}

export default function StockListItem({ stock, index }: StockListItemProps) {
  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <li className="flex w-full h-[63px] bg-[#22222A] rounded-lg text-[16px] text-[#AAAFBE] font-normal cursor-pointer">
        <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center text-white max-[1248px]:hidden">
          #{index + 1}
        </div>
        <div className="h-full flex-1 shrink basis-[507px] flex items-center gap-[6px] pl-[24px] max-[1248px]:basis-auto max-[1248px]:max-w-[220px]">
          <span className="max-[1248px]:truncate max-[1248px]:whitespace-nowrap">
            {stock.name}
          </span>
          <div className="max-[1248px]:max-w-[100px]">
            <span className="block overflow-hidden whitespace-nowrap truncate">
              <Sentiment sentiment={stock.sentiment ?? 0} />
            </span>
          </div>
        </div>
        <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end max-[1248px]:mr-[24px] max-[1248px]:basis-auto">
          {formatKRW(stock.current_price ?? 0, true)}
        </div>
        <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end max-[1248px]:hidden">
          {formatKRW(stock.volume ?? 0)}
        </div>
        <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px] max-[1248px]:hidden">
          {formatKRW(stock.market_cap ?? 0)}
        </div>
      </li>
    </Link>
  );
}

function Sentiment({ sentiment }: { sentiment: number }) {
  const style = {
    positive: "bg-[#2FACA0]/20 border-[#2FACA0] text-[#00FFE7]",
    neutral: "bg-[#71717A]/20 border-[#71717A] text-[#D4D4D8]",
    negative: "bg-[#AC2F2F]/20 border-[#E85451] text-[#EC3431]",
  };

  const text = sentiment > 0 ? "긍정" : sentiment < 0 ? "부정" : "중립";
  const currentStyle =
    sentiment > 0
      ? style.positive
      : sentiment < 0
      ? style.negative
      : style.neutral;

  return (
    <div
      className={`w-[38px] h-[19px] flex items-center justify-center rounded-[70px] border text-[12px] font-medium ${currentStyle}`}
    >
      {text}
    </div>
  );
}
