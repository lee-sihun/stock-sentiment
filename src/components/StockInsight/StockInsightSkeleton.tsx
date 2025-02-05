import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockInsightSkeleton() {
  return (
    <section className="flex flex-col gap-[16px]">
      <div className="flex flex-col w-[282px] max-[1248px]:w-full justify-between gap-0 mt-[16px]">
        {/* 헤더 부분: 반응형 대응으로 작은 화면에서는 폭 조정 */}
        <Skeleton
          width={80}
          height={14}
          baseColor="#202020"
          highlightColor="#444"
          className="max-[1248px]:!w-[60px]"
        />
        <Skeleton
          width={282}
          height={8}
          baseColor="#202020"
          highlightColor="#444"
          className="max-[1248px]:!w-full"
        />
        <div className="flex justify-between">
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
            className="max-[1248px]:!w-[60px]"
          />
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
            className="max-[1248px]:!w-[60px]"
          />
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
            className="max-[1248px]:!w-[60px]"
          />
        </div>
      </div>
      <div className="flex flex-col w-[282px] max-[1248px]:w-full gap-[12px]">
        {/* 콘텐츠 부분: 반응형 대응 */}
        <Skeleton
          width={282}
          height={46}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          className="max-[1248px]:!w-full"
        />
        <Skeleton
          width={282}
          height={46}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          className="max-[1248px]:!w-full"
        />
      </div>
    </section>
  );
}
