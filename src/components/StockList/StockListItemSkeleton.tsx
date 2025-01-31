import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockListItemSkeleton() {
  return (
    <li className="flex w-full h-[63px] bg-[#22222A] rounded-lg text-[16px] text-[#AAAFBE] font-normal">
      <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center">
        <Skeleton
          width={30}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[507px] flex items-center gap-[6px] pl-[24px]">
        <Skeleton
          width={200}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          width={38}
          height={19}
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={70}
        />
      </div>
      <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end">
        <Skeleton
          width={100}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end">
        <Skeleton
          width={120}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px]">
        <Skeleton
          width={150}
          height={24}
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
    </li>
  );
}
