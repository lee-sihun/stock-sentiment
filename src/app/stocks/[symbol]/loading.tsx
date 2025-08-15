import Layout from "@/components/Layout";
import StockHeaderSkeleton from "@/components/StockHeader/StockHeaderSkeleton";
import StockInsightSkeleton from "@/components/StockInsight/StockInsightSkeleton";
import StockGraphSkeleton from "@/components/StockGraph/StockGraphSkeleton";
import StockNewsSkeleton from "@/components/StockNews/StockNewsSkeleton";

export default function Loading() {
  return (
    <Layout>
      <StockHeaderSkeleton />
      <div className="flex justify-between gap-[24px] max-[1248px]:flex-col">
        <StockInsightSkeleton />
        <StockGraphSkeleton />
      </div>
      <StockNewsSkeleton />
    </Layout>
  );
}
