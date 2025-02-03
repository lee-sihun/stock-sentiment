"use client";
import { useNews } from "@/hooks/useNews";
import { format } from "date-fns";
import Graph from "./Graph";
import TimeRangeSelector from "./TimeRangeSelector";

export default function StockGraph({ symbol }: { symbol: string }) {
  const { data: news } = useNews(symbol);

  const graphData = news
    ?.sort(
      (a, b) =>
        // @ts-expect-error 타입 에러
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    )
    .map((item) => ({
      name: format(
        // @ts-expect-error 타입 에러
        new Date(new Date(item.published_at).getTime() + 32400000),
        "HH:mm"
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
    <section className="mt-[24px] flex flex-col w-full gap-[14px]">
      <div className="flex justify-between items-center">
        <span className="flex items-center justify-center w-[409px] h-[40px] bg-[#22222A] rounded-[8px] text-[#AAAFBE] text-[14px] font-semibold">
          최근 데이터가&nbsp;
          <span className="text-white">{latestDate}</span>에 갱신되었습니다.
        </span>
        <TimeRangeSelector />
      </div>
      <Graph data={graphData || []} />
    </section>
  );
}
