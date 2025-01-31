import { EXCHANGE_RATE } from "@/config/constants";

export const formatKRW= (value: number, isPrice = false) => {
  const convertedValue = value * EXCHANGE_RATE.USD_KRW;
  
  // 주가
  if (isPrice) {
    return new Intl.NumberFormat('ko-KR').format(Math.floor(convertedValue)) + '원';
  }
  
  // 시가총액, 거래대금은 조/억 단위로 표시
  if (convertedValue >= 1e12) {
    const trillions = Math.floor(convertedValue / 1e12);
    const billions = Math.floor((convertedValue % 1e12) / 1e8);
    return `${new Intl.NumberFormat('ko-KR').format(trillions)}조 ${new Intl.NumberFormat('ko-KR').format(billions)}억`;
  }
  
  if (convertedValue >= 1e8) {
    const billions = Math.floor(convertedValue / 1e8);
    return `${new Intl.NumberFormat('ko-KR').format(billions)}억`;
  }
  
  return new Intl.NumberFormat('ko-KR').format(Math.floor(convertedValue));
};