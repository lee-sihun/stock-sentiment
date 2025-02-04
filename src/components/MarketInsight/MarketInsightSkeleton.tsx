import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MarketInsightSkeleton() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-[28px] mt-[73px] max-[1248px]:gap-[21px] max-[1248px]:mt-[94px]">
      <h2 className="text-[56px] font-bold text-center leading-[67px] max-[1248px]:leading-[43px] w-full flex flex-col max-[1248px]:gap-1">
        <Skeleton
          className="!w-[400px] h-[67px] max-[1248px]:!w-[300px] max-[1248px]:h-[43px]"
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          className="!w-[600px] h-[67px] max-[1248px]:!w-[320px] max-[1248px]:h-[43px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </h2>
      <p className="text-[20px] text-center w-full flex flex-col">
        <Skeleton
          className="!w-[300px] h-[24px] max-[1248px]:!w-[250px] max-[1248px]:h-[20px]"
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          className="!w-[250px] h-[24px] max-[1248px]:!w-[200px] max-[1248px]:h-[20px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </p>
    </section>
  );
}
