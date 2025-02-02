import Smile from "@public/svgs/smile.svg";
import Report from "@public/svgs/report.svg";

export default function StockInsight({ symbol }: { symbol: string }) {
  return (
    <section className="flex flex-col gap-[16px]">
      <SentimentsChart />
      <StockInfo />
    </section>
  );
}

function SentimentsChart() {
  return (
    <div className="flex flex-col w-[282px] justify-between gap-[10px] mt-[16px]">
      <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
        시장 반응 비율
      </span>
      <div className="flex w-full items-center">
        <div
          className="bg-[#2FACA0] h-[8px] rounded-l-[18px]"
          style={{ width: "70%" }}
        />
        <div className="bg-white h-[8px]" style={{ width: "10%" }} />
        <div
          className="bg-[#E85451] h-[8px] rounded-r-[18px]"
          style={{ width: "20%" }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-[#2FACA0]">긍정 </span>
          (70%)
        </span>
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-white">중립 </span>
          (10%)
        </span>
        <span className="text-[12px] text-[#AAAFBE] leading-[14px]">
          <span className="text-[#E85451]">부정 </span>
          (20%)
        </span>
      </div>
    </div>
  );
}

function StockInfo() {
  return (
    <div className="flex flex-col w-[282px] gap-[12px]">
      <span className="w-full h-[46px] bg-[#22222A] rounded-[8px] px-[18px] flex items-center text-[16px] text-[#AAAFBE] leading-[19px]">
        <Smile className="mr-[18px]" />
        현재 시장 반응이&nbsp;
        <span className="text-white font-medium">긍정적</span>
        입니다.
      </span>
      <span className="w-full h-[46px] bg-[#22222A] rounded-[8px] px-[18px] flex items-center text-[16px] text-[#AAAFBE] leading-[19px]">
        <Report className="mr-[18px]" />
        <span className="text-white font-medium">7일</span>
        &nbsp;동안&nbsp;
        <span className="text-white font-medium">52%</span>
        &nbsp;예측 성공
      </span>
    </div>
  );
}
