"use client";
import { useState } from "react";
import Star from "@public/svgs/star.svg";
import Arrow from "@public/svgs/arrow.svg";
import StockListItem from "./StockListItem";

export default function StockList() {
  return (
    <section className="mt-[68px]">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h3 className="text-white text-[32px] font-bold">분석 중인 종목</h3>
          <p className="text-white text-[16px] font-medium">
            현재 시장에서 주목할 만한 핵심 종목
          </p>
        </div>
        <PortfolioToggle />
      </div>
      <ul className="flex flex-col w-full text-white text-[15px] font-semibold">
        <div className="flex w-full h-[42px] mt-[22px] border-t border-[#D9D9D9]/20">
          <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center">
            <Arrow />
          </div>
          <div className="h-full flex-1 shrink basis-[507px] flex items-center pl-[24px]">
            종목
          </div>
          <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end">
            현재 주가
          </div>
          <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end">
            24시간 거래대금
          </div>
          <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px]">
            시가총액
          </div>
        </div>
        <div className="flex flex-col w-full gap-[12px]">
          {Array.from({ length: 15 }).map((_, index) => (
            <StockListItem key={index} />
          ))}
        </div>
      </ul>
    </section>
  );
}

function PortfolioToggle() {
  const [active, setActive] = useState(false);

  return (
    <button
      className="flex items-center gap-[8px] h-[38px] bg-[#22222A] px-[16px] rounded-lg text-white text-[14px] font-medium"
      onClick={() => setActive(!active)}
    >
      <Star fill={active ? "#FFD900" : "white"} />
      포트폴리오
    </button>
  );
}
