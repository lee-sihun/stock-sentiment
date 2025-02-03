import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockGraphSkeleton() {
  return (
    <section className="flex flex-col gap-[14px] w-full">
      <div className="flex justify-between items-center">
        <Skeleton
          width={409}
          height={40}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
        />
        <Skeleton
          width={120}
          height={40}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
        />
      </div>
      <Skeleton
        width="100%"
        height={320}
        baseColor="#202020"
        highlightColor="#444"
        borderRadius={8}
      />
    </section>
  );
}
