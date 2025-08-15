import Layout from "@/components/Layout";
import MarketInsight from "@/components/MarketInsight";
import StockList from "@/components/StockList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getStocksByPage } from "@/services/stocks/getStocks";
import { unstable_cache } from "next/cache";
import type { Stock } from "@/types/stock";

export const revalidate = 300; 

export default async function Home() {
  // 서버에서 초기 데이터 프리패치 후 하이드레이션
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infiniteStocks"],
    queryFn: async ({ pageParam = 0 }) =>
      unstable_cache(
        () => getStocksByPage(pageParam),
        ["stocks", String(pageParam)],
        { revalidate: 300 }
      )(),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Stock[], allPages: Stock[][]) => {
      if (allPages.length >= 3) return undefined; // 클라이언트 훅과 동일한 최대 페이지
      return lastPage.length === 10 ? allPages.length : undefined;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Layout>
        <MarketInsight />
        <StockList />
      </Layout>
    </HydrationBoundary>
  );
}
