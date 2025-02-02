import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockInsightSkeleton() {
  return (
    <section className="flex flex-col gap-[16px]">
      <div className="flex flex-col w-[282px] justify-between gap-[0px] mt-[16px]">
        <Skeleton
          width={80}
          height={14}
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          width={282}
          height={8}
          baseColor="#202020"
          highlightColor="#444"
        />
        <div className="flex justify-between">
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
          />
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
          />
          <Skeleton
            width={80}
            height={14}
            baseColor="#202020"
            highlightColor="#444"
          />
        </div>
      </div>
      <div className="flex flex-col w-[282px] gap-[12px]">
        <Skeleton
          width={282}
          height={46}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
        />
        <Skeleton
          width={282}
          height={46}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
        />
      </div>
    </section>
  );
}
