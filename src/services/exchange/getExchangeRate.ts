import { EXCHANGE_RATE } from "@/config/constants";
import { unstable_cache } from "next/cache";

type RateMeta = { rate: number; fetchedAt: string };

async function fetchRateOnce(base: string): Promise<number> {
  const code = base.toUpperCase();
  const url = `https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=${encodeURIComponent(
    code
  )}&u4=KRW&u8=down&u2=1`;
  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as {
      country?: { value?: string }[];
    };
    const raw = data?.country?.[1]?.value || data?.country?.[0]?.value;
    if (!raw) throw new Error("No rate in response");
    const numeric = Number(String(raw).replace(/,/g, ""));
    if (!Number.isFinite(numeric) || numeric <= 0) throw new Error("Bad rate");
    return numeric;
  } catch {
    // fallback to static mapping
    const map = EXCHANGE_RATE.CURRENCY_TO_KRW as Record<string, number>;
    return map[code] ?? EXCHANGE_RATE.CURRENCY_TO_KRW.USD;
  }
}

export async function getExchangeRate(base: string): Promise<number> {
  const meta = await getExchangeRateWithMeta(base);
  return meta.rate;
}

export async function getExchangeRateWithMeta(base: string): Promise<RateMeta> {
  const code = base.toUpperCase();
  return unstable_cache(
    async () => {
      const rate = await fetchRateOnce(code);
      return { rate, fetchedAt: new Date().toISOString() } as RateMeta;
    },
    ["exchange-rate-meta", code],
    { revalidate: 60 * 60 * 24, tags: [`exchange-rate:${code}`] }
  )();
}
