import { EXCHANGE_RATE } from "@/config/constants";

type CurrencyMap = typeof EXCHANGE_RATE.CURRENCY_TO_KRW;

function toKRW(value: number, currency?: string | null) {
  const c = (currency || "USD").toUpperCase() as keyof CurrencyMap | string;
  const map: CurrencyMap = EXCHANGE_RATE.CURRENCY_TO_KRW;
  const rate =
    c in map
      ? (map as Record<string, number>)[c as string]
      : EXCHANGE_RATE.CURRENCY_TO_KRW.USD;
  return value * rate;
}

export const formatKRW = (
  value: number,
  isPrice = false,
  currency?: string | null
) => {
  const convertedValue = toKRW(value, currency);

  // 주가
  if (isPrice) {
    return (
      new Intl.NumberFormat("ko-KR").format(Math.floor(convertedValue)) + "원"
    );
  }

  // 시가총액, 거래대금은 조/억 단위로 표시
  if (convertedValue >= 1e12) {
    const trillions = Math.floor(convertedValue / 1e12);
    const billions = Math.floor((convertedValue % 1e12) / 1e8);
    return `${new Intl.NumberFormat("ko-KR").format(
      trillions
    )}조 ${new Intl.NumberFormat("ko-KR").format(billions)}억`;
  }

  if (convertedValue >= 1e8) {
    const billions = Math.floor(convertedValue / 1e8);
    return `${new Intl.NumberFormat("ko-KR").format(billions)}억`;
  }

  return new Intl.NumberFormat("ko-KR").format(Math.floor(convertedValue));
};

export const formatUSD = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatByCurrency = (value: number, currency?: string | null) => {
  const cur = (currency || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
};
