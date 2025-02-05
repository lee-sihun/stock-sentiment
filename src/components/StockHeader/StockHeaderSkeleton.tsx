import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockHeaderSkeleton() {
  return (
    <section className="mt-[77px] flex justify-between items-end border-b border-[rgba(217,217,217,0.2)] text-white">
      <div className="flex flex-col gap-[2px] mb-[16px]">
        <div className="flex items-center gap-[4px]">
          <Skeleton
            width={150}
            height={24}
            baseColor="#202020"
            highlightColor="#444"
            className="max-[1248px]:!w-[100px]"
          />
          <Skeleton
            width={60}
            height={19}
            baseColor="#202020"
            highlightColor="#444"
            borderRadius={4}
          />
          <Skeleton
            width={60}
            height={19}
            baseColor="#202020"
            highlightColor="#444"
            borderRadius={4}
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <Skeleton
            width={200}
            height={43}
            baseColor="#202020"
            highlightColor="#444"
          />
          <Skeleton
            width={100}
            height={22}
            baseColor="#202020"
            highlightColor="#444"
            className="max-[1248px]:!hidden"
          />
        </div>
      </div>
      <div className="flex gap-[10px] mb-[24px]">
        <Skeleton
          width={100}
          height={38}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          className="max-[1248px]:!w-[48px]"
        />
        <Skeleton
          width={100}
          height={38}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={8}
          className="max-[1248px]:!w-[48px]"
        />
      </div>
    </section>
  );
}
