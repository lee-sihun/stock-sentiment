import { getRecentNews } from '@/services/news/getRecentNews';
import { NextResponse } from 'next/server';

type Params = Promise<{ symbol: string }>;

export async function GET(
  request: Request,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const news = await getRecentNews(params.symbol);
    return NextResponse.json(news);
  } catch (error) {
    console.error('뉴스 API 오류:', error);
    return NextResponse.json(
      { error: '뉴스 데이터 조회 실패' },
      { status: 500 }
    );
  }
}