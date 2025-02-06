import localFont from "next/font/local";
import type { Metadata } from "next";
import "@styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Layout/Background";
import NextTopLoader from "nextjs-toploader";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deepeye.pro"),
  title: {
    default: "DeepEye",
    template: "%s | DeepEye",
  },
  description: "주식 기사 감정 분석 서비스 DeepEye입니다.",
  openGraph: {
    title: "DeepEye",
    description: "주식 기사 감정 분석 서비스 DeepEye입니다.",
    type: "website",
    siteName: "DeepEye",
    url: "https://deepeye.pro",
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
    title: "DeepEye",
    description: "주식 기사 감정 분석 서비스 DeepEye입니다.",
    images: [
      {
        url: "/img/logo.jpg",
        alt: "site logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <ReactQueryProvider>
          <NextTopLoader color="#2FACA0" showSpinner={false} />
          <Background />
          <Header />
          <main className="z-[2]">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
