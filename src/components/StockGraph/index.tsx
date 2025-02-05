"use client";
import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import { useSentiments } from "@/hooks/useSentiments";
import { format } from "date-fns";
import Graph from "./Graph";
import TimeRangeSelector from "./TimeRangeSelector";
import StockGraphSkeleton from "./StockGraphSkeleton";

export default function StockGraph({ symbol }: { symbol: string }) {
  const [selected, setSelected] = useState("24h");
  const { data: news, isLoading: newsLoading } = useNews(symbol);
  const { data: sentiments, isLoading: sentimentsLoading } =
    useSentiments(symbol);

  if (newsLoading || sentimentsLoading) return <StockGraphSkeleton />;

  const graphData =
    selected === "24h"
      ? news
          ?.sort(
            (a, b) =>
              // @ts-expect-error 타입 에러
              new Date(a.published_at).getTime() -
              // @ts-expect-error 타입 에러
              new Date(b.published_at).getTime()
          )
          .map((item) => ({
            name: format(
              // @ts-expect-error 타입 에러
              new Date(new Date(item.published_at).getTime() + 32400000),
              "HH:mm"
            ),
            value: item.sentiment,
          }))
      : sentiments
          // @ts-expect-error 타입 에러
          ?.filter((item) => item.is_accurate !== null)
          .sort(
            (a, b) =>
              // @ts-expect-error 타입 에러
              new Date(b.created_at).getTime() -
              // @ts-expect-error 타입 에러
              new Date(a.created_at).getTime()
          )
          .slice(0, 7)
          .reverse()
          .map((item) => ({
            name: format(
              // @ts-expect-error 타입 에러
              new Date(new Date(item.created_at).getTime() + 32400000),
              "MM/dd"
            ),
            value: item.sentiment,
          }));

  const latestNews = news?.sort(
    (a, b) =>
      // @ts-expect-error 타입 에러
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];

  const latestDate = latestNews
    ? format(
        // @ts-expect-error 타입 에러
        new Date(new Date(latestNews.created_at).getTime() + 32400000),
        "yyyy년 M월 d일 a h시"
      )
        .replace("AM", "오전")
        .replace("PM", "오후")
    : "날짜 없음";

  return (
    <section className="mt-[24px] max-[1248px]:mt-[12px] flex flex-col max-[1248px]:flex-col-reverse w-full gap-[14px] max-[1248px]:gap-[24px]">
      <div className="flex justify-between items-center max-[1248px]:flex-col-reverse max-[1248px]:gap-[14px]">
        <span className="flex items-center justify-center w-[409px] max-[1248px]:w-full h-[40px] bg-[#22222A] rounded-[8px] text-[#AAAFBE] text-[14px] max-[1248px]:text-[12px] font-semibold">
          최근 데이터가&nbsp;
          <span className="text-white">{latestDate}</span>에 갱신되었습니다.
        </span>
        <TimeRangeSelector selected={selected} setSelected={setSelected} />
      </div>
      <Graph data={graphData || []} />
    </section>
  );
}
