import Layout from "@/components/Layout";
import StockHeader from "@/components/StockHeader";
import StockInsight from "@/components/StockInsight";

type Params = Promise<{ symbol: string }>;

export default async function Page({ params }: { params: Params }) {
  const { symbol } = await params;

  return (
    <Layout>
      <StockHeader symbol={symbol} />
      <StockInsight symbol={symbol} />
    </Layout>
  );
}
