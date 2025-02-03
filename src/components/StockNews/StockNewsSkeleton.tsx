import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StockNewsSkeleton() {
  return (
    <section className="flex flex-col gap-[83px] w-full mt-[32px]">
      <div className="flex items-center w-full gap-[25px]">
        <Skeleton
          width={100}
          height={31}
          baseColor="#202020"
          highlightColor="#444"
        />
        <div className="flex gap-[8px]">
          <Skeleton
            width={35}
            height={35}
            baseColor="#202020"
            highlightColor="#444"
            borderRadius={19}
          />
          <Skeleton
            width={35}
            height={35}
            baseColor="#202020"
            highlightColor="#444"
            borderRadius={19}
          />
        </div>
        <div className="w-full h-[1px] bg-[#D9D9D9]/20" />
      </div>
      <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide gap-[24px]">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col w-[282px] gap-[20px]">
            <Skeleton
              width={282}
              height={160}
              baseColor="#202020"
              highlightColor="#444"
              borderRadius={8}
            />
            <Skeleton
              width={282}
              height={52}
              baseColor="#202020"
              highlightColor="#444"
            />
            <div className="flex flex-col gap-[3px]">
              <Skeleton
                width={200}
                height={19}
                baseColor="#202020"
                highlightColor="#444"
              />
              <div className="flex items-center gap-[10px]">
                <Skeleton
                  width={80}
                  height={19}
                  baseColor="#202020"
                  highlightColor="#444"
                />
                <Skeleton
                  width={34}
                  height={17}
                  baseColor="#202020"
                  highlightColor="#444"
                  borderRadius={80}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
