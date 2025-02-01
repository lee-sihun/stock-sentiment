import Layout from "@/components/Layout";
import StockHeader from "@/components/StockHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Layout>
      <StockHeader symbol={params.slug} />
    </Layout>
  );
}
