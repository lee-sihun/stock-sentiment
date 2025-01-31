export default function MarketInsight() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-[28px] mt-[73px]">
      <h2 className="text-[56px] font-bold text-white text-center leading-[67px]">
        현재 시장은{" "}
        <span className="bg-gradient-to-r from-[#B9E12A] to-[#29E4AF] text-transparent bg-clip-text">
          긍정적
        </span>
        이며
        <br />
        상승세를 보이고 있습니다
      </h2>
      <p className="text-[20px] font-semibold text-[#AAAFBE] text-center">
        뉴스 기반으로 시장 감정을 분석하여
        <br /> 투자 인사이트를 제공합니다
      </p>
    </section>
  );
}
