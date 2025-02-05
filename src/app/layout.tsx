import localFont from "next/font/local";
import "@styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Layout/Background";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <ReactQueryProvider>
          <Background />
          <Header />
          <main className="z-[2]">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
