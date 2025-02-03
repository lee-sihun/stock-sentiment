import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import StockHeader from "@/components/StockHeader";
import StockInsight from "@/components/StockInsight";

type Params = Promise<{ symbol: string }>;

export default async function Page({ params }: { params: Params }) {
  const { symbol } = await params;

  return (
    <Layout>
      <StockHeader symbol={symbol} />
      <div className="flex justify-between gap-[24px]">
        <StockInsight symbol={symbol} />
        <StockGraph symbol={symbol} />
      </div>
    </Layout>
  );
}
