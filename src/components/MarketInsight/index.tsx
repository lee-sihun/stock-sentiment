import { STOCK_COUNT } from "@/config/constants";
import { unstable_cache } from "next/cache";
import { getTodaySentiments } from "@/services/sentiments/getTodaySentiments";

export default async function MarketInsight() {
  const sentiments = await unstable_cache(
    () => getTodaySentiments(),
    ["todaySentiments"],
    { revalidate: 300 }
  )();

  const processedSentiments = sentiments
    ?.slice()
    .reverse()
    .slice(0, STOCK_COUNT.STOCK_COUNT - 1);
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

  const gradientColor = isPositive
    ? ["#B9E12A", "#29E4AF"]
    : ["#E12AB0", "#E42961"];

  return (
    <section className="w-full flex flex-col items-center justify-center gap-[28px] max-[1248px]:gap-[21px] mt-[73px] max-[1248px]:mt-[94px]">
      <h2 className="text-[56px] max-[1248px]:text-[36px] max-[400px]:text-[32px] font-bold text-white text-center leading-[67px] max-[1248px]:leading-[43px]">
        현재 시장은{" "}
        <span
          style={{
            background: `-webkit-linear-gradient(left, ${gradientColor[0]}, ${gradientColor[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: gradientColor[0],
          }}
          className={`
            bg-gradient-to-r ${gradient} 
            [background-clip:text] 
            [-webkit-background-clip:text] 
            text-transparent
          `}
        >
          {isPositive ? "긍정적" : "부정적"}
        </span>
        이며
        <br />
        {isPositive ? "상승세" : "하향세"}를 보이고 있습니다
      </h2>
      <p className="text-[20px] max-[1248px]:text-[16px] font-semibold text-[#AAAFBE] text-center leading-[24px] max-[1248px]:leading-[19px]">
        뉴스 기반으로 시장 감정을 분석하여
        <br /> 투자 인사이트를 제공합니다
      </p>
    </section>
  );
}
