import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import StockHeader from "@/components/StockHeader";
import StockInsight from "@/components/StockInsight";
import StockNews from "@/components/StockNews";

type Params = Promise<{ symbol: string }>;

export default async function Page({ params }: { params: Params }) {
  const { symbol } = await params;

  return (
    <Layout>
      <StockHeader symbol={symbol} />
      <div className="flex justify-between gap-[24px] max-[1248px]:flex-col">
        <StockInsight symbol={symbol} />
        <StockGraph symbol={symbol} />
      </div>
      <StockNews symbol={symbol} />
    </Layout>
  );
}
