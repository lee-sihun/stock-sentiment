import { getStocks } from '@/services/getStocks';
import { NextResponse } from 'next/server';

type Params = Promise<{ symbol: string }>;

export async function GET(
  request: Request,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const stocks = await getStocks(params.symbol);
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('주식 API 오류:', error);
    return NextResponse.json(
      { error: '주식 데이터 조회 실패' },
      { status: 500 }
    );
  }
}