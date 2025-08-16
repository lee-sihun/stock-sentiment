// 시가총액 상위 종목 개수
export const MARKET = {
  TOP_STOCKS_COUNT: 40,
} as const;

// 뉴스 개수
export const NEWS = {
  NEWS_COUNT: 10,
} as const;

// 사용 AI 모델
export const AI = {
  /*
    deepseek/deepseek-r1
    deepseek/deepseek-chat
    openai/gpt-4o-2024-11-20
    openai/gpt-4o-mini
    google/gemini-2.0-flash-001
  */
  MODEL: "google/gemini-2.5-flash-lite",
} as const;

// 한번에 보여줄 종목 개수
export const STOCK_COUNT = {
  STOCK_COUNT: 10,
} as const;

// 환율
export const EXCHANGE_RATE = {
  // KRW 환율 (환율 API 에러 시 사용)
  CURRENCY_TO_KRW: {
    KRW: 1,
    USD: 1390,
    EUR: 1630,
    JPY: 9.5,
    CNY: 190,
    HKD: 180,
    GBP: 1890,
    TWD: 45,
    SAR: 370,
  } as const,
} as const;

// 예측 성공률 계산 기간 (일)
export const PREDICTION = {
  SUCCESS_RATE_DAYS: 30,
} as const;
