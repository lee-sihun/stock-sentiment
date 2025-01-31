"use client";
import { useTodaySentiments } from "@/hooks/useTodaySentiments";
import MarketInsightSkeleton from "./MarketInsightSkeleton";
import { STOCK_COUNT } from "@/config/constants";

export default function MarketInsight() {
  const { data: sentiments, isLoading } = useTodaySentiments();

  if (isLoading) return <MarketInsightSkeleton />;

  const processedSentiments = sentiments?.reverse().slice(0, STOCK_COUNT.STOCK_COUNT - 1);
  const totalSentiment =
    processedSentiments?.reduce((sum, item) => {
      const normalizedSentiment =
        item.sentiment > 0 ? 1 : item.sentiment < 0 ? -1 : 0;
      return sum + normalizedSentiment;
    }, 0) || 0;
  const isPositive = totalSentiment >= 0;

  const gradient = isPositive
    ? "from-[#B9E12A] to-[#29E4AF]"
    : "from-[#E12AB0] to-[#E42961]";

  return (
    <section className="w-full flex flex-col items-center justify-center gap-[28px] mt-[73px]">
      <h2 className="text-[56px] font-bold text-white text-center leading-[67px]">
        현재 시장은{" "}
        <span
          className={`bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
        >
          {isPositive ? "긍정적" : "부정적"}
        </span>
        이며
        <br />
        {isPositive ? "상승세" : "하향세"}를 보이고 있습니다
      </h2>
      <p className="text-[20px] font-semibold text-[#AAAFBE] text-center">
        뉴스 기반으로 시장 감정을 분석하여
        <br /> 투자 인사이트를 제공합니다
      </p>
    </section>
  );
}
