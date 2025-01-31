import Layout from "@/components/Layout";
import MarketInsight from "@/components/MarketInsight";
import StockList from "@/components/StockList";

export default function Home() {
  return (
    <Layout>
      <MarketInsight />
      <StockList />
    </Layout>
  );
}
