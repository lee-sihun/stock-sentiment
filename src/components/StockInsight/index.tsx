"use client";
import { useNews } from "@/hooks/useNews";
import { useSentiments } from "@/hooks/useSentiments";
import { NewsArticle } from "@/types/news";
import { Sentiment } from "@/types/sentiment";
import StockInsightSkeleton from "./StockInsightSkeleton";
import Smile from "@public/svgs/smile.svg";
import Expressionless from "@public/svgs/expressionless.svg";
import Bad from "@public/svgs/bad.svg";
import Report from "@public/svgs/report.svg";

export default function StockInsight({ symbol }: { symbol: string }) {
  const { data: news, isLoading: newsLoading } = useNews(symbol);
  const { data: sentiments, isLoading: sentimentsLoading } =
    useSentiments(symbol);

  if (newsLoading || sentimentsLoading) {
    return <StockInsightSkeleton />;
  }
  return (
    <section className="flex flex-col gap-[16px]">
      <SentimentsChart data={news || []} />
      <StockInfo data={news || []} sentiments={sentiments || []} />
    </section>
  );
}

function SentimentsChart({ data }: { data: NewsArticle[] }) {
  const total = data.length;
  const positiveCount = data.filter((item) => item.sentiment === 1).length;
  const neutralCount = data.filter((item) => item.sentiment === 0).length;
  const negativeCount = data.filter((item) => item.sentiment === -1).length;

  const positiveRatio = total ? (positiveCount / total) * 100 : 0;
  const neutralRatio = total ? (neutralCount / total) * 100 : 0;
  const negativeRatio = total ? (negativeCount / total) * 100 : 0;

  return (
    <div className="flex flex-col w-[282px] max-[1248px]:w-full justify-between gap-[10px] mt-[16px]">
      <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
        시장 반응 비율
      </span>
      <div className="flex w-full items-center">
        <div
          className="bg-[#2FACA0] h-[8px] rounded-l-[18px]"
          style={{ width: `${positiveRatio}%` }}
        />
        <div
          className="bg-white h-[8px]"
          style={{ width: `${neutralRatio}%` }}
        />
        <div
          className="bg-[#E85451] h-[8px] rounded-r-[18px]"
          style={{ width: `${negativeRatio}%` }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-[#2FACA0]">긍정</span>(
          {positiveRatio.toFixed(0)}%)
        </span>
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-white">중립</span>({neutralRatio.toFixed(0)}%)
        </span>
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-[#E85451]">부정</span>(
          {negativeRatio.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
}

function StockInfo({
  data,
  sentiments,
}: {
  data: NewsArticle[];
  sentiments: Sentiment[];
}) {
  const positiveCount = data.filter((item) => item.sentiment === 1).length;
  const neutralCount = data.filter((item) => item.sentiment === 0).length;
  const negativeCount = data.filter((item) => item.sentiment === -1).length;

  const maxCount = Math.max(positiveCount, neutralCount, negativeCount);
  const marketSentiment =
    maxCount === positiveCount
      ? "긍정적"
      : maxCount === negativeCount
      ? "부정적"
      : "중립적";
  const EmotionIcon =
    maxCount === positiveCount
      ? Smile
      : maxCount === negativeCount
      ? Bad
      : Expressionless;

  const nonNeutralSentiments = sentiments.filter(
    (s) => s.is_accurate !== null && s.sentiment !== 0
  );
  const days = nonNeutralSentiments.length;
  const successCount = nonNeutralSentiments.filter((s) => s.is_accurate).length;
  const successRate = days > 0 ? Math.floor((successCount / days) * 100) : 0;

  return (
    <div className="flex flex-col w-[282px] max-[1248px]:w-full gap-[12px]">
      <span className="w-full h-[46px] bg-[#22222A] rounded-[8px] px-[18px] flex items-center text-[16px] text-[#AAAFBE] leading-[19px]">
        <EmotionIcon className="mr-[18px]" />
        현재 시장 반응이&nbsp;
        <span className="text-white font-medium">{marketSentiment}</span>
        입니다.
      </span>
      <span className="w-full h-[46px] bg-[#22222A] rounded-[8px] px-[18px] flex items-center text-[16px] text-[#AAAFBE] leading-[19px]">
        <Report className="mr-[18px]" />
        <span className="text-white font-medium">{days}일</span>
        &nbsp;동안&nbsp;
        <span className="text-white font-medium">{successRate}%</span>
        &nbsp;예측 성공
      </span>
    </div>
  );
}
