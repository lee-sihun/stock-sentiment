// import { updateStockRank } from '../src/services/updateStockRank';
// import { createStockNews } from '../src/services/createStockNews';
// import { updateNewsSentiment } from '@/services/updateNewsSentiment';
// import { updateTotalSentiment } from '@/services/updateTotalSentiment';
// import { verifySentiments } from '@/services/verifySentiments';
import { rollbackAccuracy } from '@services/verifyPastSentiments' 

async function main() {
  try {
    await rollbackAccuracy();
    // await verifyPastSentiments();
    // console.log('이전 감정 분석 검증 시작...');
    // await verifySentiments();

    // console.log('주식 순위 업데이트 시작...');
    // await updateStockRank();
    
    // console.log('주식 뉴스 수집 시작...');
    // await createStockNews();

    // console.log('뉴스 감정 분석 시작...');
    // await updateNewsSentiment();

    // console.log('감정 점수 합산 시작...');
    // await updateTotalSentiment();
    
    // console.log('모든 작업이 완료되었습니다.');
  } catch (error) {
    console.error('작업 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

main();