"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useScroll } from "@/hooks/useScroll";
import { useNews } from "@/hooks/useNews";
import { NewsArticle } from "@/types/news";
import { getTimeAgo } from "@/utils/formatTime";
import StockNewsSkeleton from "./StockNewsSkeleton";
import Image from "next/image";
import Arrow from "@public/svgs/angle-arrow.svg";

export default function StockNews({ symbol }: { symbol: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { smoothScroll, checkScrollable } = useScroll();
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });
  const { data: news, isLoading } = useNews(symbol);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const newState = checkScrollable(scrollRef.current);
      setScrollState((prev) =>
        prev.canScrollLeft === newState.canScrollLeft &&
        prev.canScrollRight === newState.canScrollRight
          ? prev
          : newState
      );
    }
  }, [checkScrollable]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      const observer = new ResizeObserver(handleScroll);
      observer.observe(element);
      handleScroll();

      return () => {
        element.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }
  }, [handleScroll]);

  if (isLoading) return <StockNewsSkeleton />;

  const sortedNews = news
    ?.filter((item) => !item.thumbnail_url?.includes("placeholder.com"))
    ?.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

  return (
    <section className="flex flex-col gap-[83px] max-[1248px]:gap-[50px] w-full mt-[32px]">
      <div className="flex items-center w-full gap-[25px]">
        <span className="text-[26px] font-bold text-white leading-[31px] whitespace-nowrap">
          관련 뉴스
        </span>
        <div className="flex gap-[8px]">
          <button
            onClick={() => smoothScroll(scrollRef.current, "left")}
            disabled={!scrollState.canScrollLeft}
            className="flex items-center justify-center w-[35px] h-[35px] rounded-[19px] bg-[#22222A] border border-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed"
          >
            <Arrow
              fill="white"
              className={`transform rotate-180 ${
                !scrollState.canScrollLeft ? "opacity-20" : ""
              }`}
            />
          </button>
          <button
            onClick={() => smoothScroll(scrollRef.current, "right")}
            disabled={!scrollState.canScrollRight}
            className="flex items-center justify-center w-[35px] h-[35px] rounded-[19px] bg-[#22222A] border border-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed"
          >
            <Arrow
              fill="white"
              className={!scrollState.canScrollRight ? "opacity-20" : ""}
            />
          </button>
        </div>
        <div className="w-full h-[1px] bg-[#D9D9D9]/20" />
      </div>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide gap-[24px]"
      >
        {sortedNews?.map((item) => (
          <NewsCard key={`${item.stock_id}-${item.published_at}`} news={item} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({ news }: { news: NewsArticle }) {
  const sentimentText =
    news.sentiment === 1 ? "긍정" : news.sentiment === -1 ? "부정" : "중립";

  const sentimentColor =
    news.sentiment === 1
      ? "bg-[#2FACA0]"
      : news.sentiment === -1
      ? "bg-[#E85451]"
      : "bg-[#22222A]";

  return (
    <article
      className="group flex flex-col w-[282px] gap-[20px] cursor-pointer"
      onClick={() => window.open(news.link, "_blank")}
    >
      <div className="w-[282px] h-[160px] overflow-hidden rounded-lg">
        <Image
          src={news.thumbnail_url || "/images/news.png"}
          alt="thumbnail"
          width={282}
          height={160}
          className="rounded-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="h-[52px] text-[22px] font-bold text-white whitespace-normal leading-[26px] line-clamp-2 overflow-hidden">
        {news.headline}
      </span>
      <div className="flex flex-col gap-[3px]">
        <span className="text-[16px] font-semibold text-[#C9CDD9] whitespace-normal leading-[19px] line-clamp-1 overflow-hidden">
          {news.source}
        </span>
        <div className="flex items-center gap-[10px]">
          <span className="text-[16px] text-[#AAAFBE] leading-[19px]">
            {getTimeAgo(news.published_at)}
          </span>
          <span
            className={`flex items-center justify-center ${sentimentColor} w-[34px] h-[17px] rounded-[80px] text-white text-[11px] font-medium`}
          >
            {sentimentText}
          </span>
        </div>
      </div>
    </article>
  );
}
