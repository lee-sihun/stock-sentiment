// 시가총액 상위 종목 개수
export const MARKET = {
  TOP_STOCKS_COUNT: 5,
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
  */
  MODEL: 'deepseek/deepseek-chat',
} as const;