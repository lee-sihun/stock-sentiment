import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MarketInsightSkeleton() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-[28px] mt-[73px]">
      <h2 className="text-[56px] font-bold text-center leading-[67px] w-full">
        <Skeleton
          width={400}
          height={67}
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          width={600}
          height={67}
          baseColor="#202020"
          highlightColor="#444"
        />
      </h2>
      <p className="text-[20px] text-center w-full">
        <Skeleton
          width={300}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          width={250}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
      </p>
    </section>
  );
}
