export const formatKRW = (value: number) => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(0)}조 ${((value % 1e12) / 1e8).toFixed(0)}억`;
  }
  if (value >= 1e8) {
    return `${(value / 1e8).toFixed(0)}억`;
  }
  return new Intl.NumberFormat('ko-KR').format(value) + '원';
};