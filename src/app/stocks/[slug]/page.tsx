import Layout from "@/components/Layout";
import StockHeader from "@/components/StockHeader";
import StockInsight from "@/components/StockInsight";

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <Layout>
      <StockHeader symbol={slug} />
      <StockInsight />
    </Layout>
  );
}
