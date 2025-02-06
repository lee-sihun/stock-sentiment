import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import StockHeader from "@/components/StockHeader";
import StockInsight from "@/components/StockInsight";
import StockNews from "@/components/StockNews";
import type { Metadata } from "next";

type Params = Promise<{ symbol: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { symbol } = await params;
  const title = `${symbol}`;
  const description = `${symbol}의 기사 감정 분석 및 최신 정보를 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "DeepEye",
      url: `https://deepeye.pro/stock/${symbol}`,
      locale: "ko_KR",
      images: [
        {
          url: "/img/logo.jpg",
          width: 800,
          height: 600,
          alt: "site logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/img/logo.jpg",
          alt: "site logo",
        },
      ],
    },
  };
}

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
