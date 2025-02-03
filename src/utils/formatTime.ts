export function getTimeAgo(date: string) {
  const diff = new Date().getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return `${hours}시간 전`;
}