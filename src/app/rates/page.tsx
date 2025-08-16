import { getExchangeRateWithMeta } from "@/services/exchange/getExchangeRate";
import { revalidateTag } from "next/cache";
import Clock from "../../components/Rates/Clock";
import ElapsedBadge from "../../components/Rates/ElapsedBadge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import ResetIcon from "@public/svgs/reset.svg";

export const revalidate = 0; // 항상 최신

const CURRENCIES = [
  "USD",
  "KRW",
  "EUR",
  "JPY",
  "CNY",
  "HKD",
  "GBP",
  "TWD",
  "SAR",
] as const;

export default async function RatesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== "cnsa201119@gmail.com") {
    redirect("/");
  }
  async function forceRevalidate(formData: FormData) {
    "use server";
    const code = String(formData.get("code") || "USD").toUpperCase();
    revalidateTag(`exchange-rate:${code}`);
  }
  async function forceRevalidateAll() {
    "use server";
    for (const code of CURRENCIES) {
      revalidateTag(`exchange-rate:${code}`);
    }
  }

  const list = await Promise.all(
    CURRENCIES.map(async (c) => {
      const { rate, fetchedAt } = await getExchangeRateWithMeta(c);
      return { code: c, rate, fetchedAt };
    })
  );

  return (
    <Layout>
      <div className="text-white mt-[77px]">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">현재 적용 환율 (→ KRW)</h1>
          <form action={forceRevalidateAll}>
            <button
              aria-label="전체 갱신"
              title="전체 갱신"
              className="inline-flex items-center justify-center w-9 h-9 rounded bg-[#44444E] hover:bg-[#4C4C57] text-white"
            >
              <ResetIcon width={18} height={18} fill={"#FFFFFF"}  />
            </button>
          </form>
        </div>
        <p className="text-sm text-[#AAAFBE] mb-4">
          <Clock />
          {/* 이 페이지는 서버에서 직접 환율을 조회합니다. 각 통화는 24시간
          캐시되며, 아래 버튼으로 특정 통화의 캐시를 강제로 갱신할 수 있습니다. */}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {list.map(({ code, rate, fetchedAt }) => (
            <div
              key={code}
              className="bg-[#22222A] rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-sm text-[#AAAFBE]">{code} → KRW</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">
                    {new Intl.NumberFormat("ko-KR").format(rate)}
                  </div>
                  <form action={forceRevalidate}>
                    <input type="hidden" name="code" value={code} />
                    <button
                      aria-label={`${code} 환율 갱신`}
                      title={`${code} 환율 갱신`}
                      className="flex items-center justify-center"
                    >
                      <ResetIcon width={14} height={14} fill={"#FFFFFF"} />
                    </button>
                  </form>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-xs text-[#8E93A6]">
                    갱신: {new Date(fetchedAt).toLocaleString("ko-KR")}
                  </div>
                  <ElapsedBadge iso={fetchedAt} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-sm text-[#AAAFBE] mt-2">
          <div>
            캐시 정책: 통화별 24시간 재검증(revalidateTag로 수동 무효화 가능)
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
