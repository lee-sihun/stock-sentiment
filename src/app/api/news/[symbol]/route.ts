import { getRecentNews } from '@/services/getRecentNews';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
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