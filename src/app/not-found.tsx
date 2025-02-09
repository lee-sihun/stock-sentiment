import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
        <h1 className="text-[#fff] text-[48px] font-semibold leading-[50px]">404</h1>
        <h2 className="text-[#fff] text-[24px] font-semibold">
          Page Not Found
        </h2>
        <Link href="/" className="text-xl underline text-blue-500">홈으로 돌아가기</Link>
      </div>
    </Layout>
  );
}
