import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockGraphSkeleton() {
  return (
    <section className="flex flex-col gap-[14px] w-full max-[1248px]:flex-col-reverse">
      <div className="flex justify-between items-center mt-[10px] max-[1248px]:flex-col">
        <Skeleton
          width={409}
          height={40}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          containerClassName="max-[1248px]:!w-full"
          className="max-[1248px]:!w-full"
        />
        <Skeleton
          width={120}
          height={40}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          containerClassName="max-[1248px]:!w-full"
          className="max-[1248px]:!w-full"
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
