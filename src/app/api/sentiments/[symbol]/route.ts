import { getSentiments } from '@/services/getSentiments';
import { NextResponse } from 'next/server';

type Params = Promise<{ symbol: string }>;

export async function GET(
  request: Request,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const sentiments = await getSentiments(params.symbol);
    return NextResponse.json(sentiments);
  } catch (error) {
    console.error('감정 API 오류:', error);
    return NextResponse.json(
      { error: '감정 데이터 조회 실패' },
      { status: 500 }
    );
  }
}