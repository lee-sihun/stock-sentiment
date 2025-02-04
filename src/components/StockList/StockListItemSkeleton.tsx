import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockListItemSkeleton() {
  return (
    <li className="flex w-full h-[63px] bg-[#22222A] rounded-lg text-[16px] text-[#AAAFBE] font-normal">
      <div className="h-full flex-1 shrink basis-[78px] flex items-center justify-center max-[1248px]:hidden">
        <Skeleton
          className="!w-[30px] !h-[24px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[507px] flex items-center gap-[6px] pl-[24px] max-[1248px]:basis-auto max-[1248px]:max-w-[220px]">
        <Skeleton
          className="!w-[200px] !h-[24px] max-[1248px]:!w-[140px]"
          baseColor="#202020"
          highlightColor="#444"
        />
        <Skeleton
          className="!w-[38px] !h-[19px] max-[1248px]:!w-[28px]"
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={70}
        />
      </div>
      <div className="h-full flex-1 shrink basis-[139px] flex items-center justify-end max-[1248px]:mr-[24px] max-[1248px]:basis-auto">
        <Skeleton
          className="!w-[100px] !h-[24px] max-[1248px]:!w-[80px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[248px] flex items-center justify-end max-[1248px]:hidden">
        <Skeleton
          className="!w-[120px] !h-[24px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
      <div className="h-full flex-1 shrink basis-[228px] flex items-center justify-end pr-[28px] max-[1248px]:hidden">
        <Skeleton
          className="!w-[150px] !h-[24px]"
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
    </li>
  );
}
