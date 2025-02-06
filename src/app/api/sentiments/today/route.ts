import { NextResponse } from 'next/server';
import { getTodaySentiments } from '@/services/sentiments/getTodaySentiments';

export async function GET() {
  try {
    const sentiments = await getTodaySentiments();
    return NextResponse.json({ sentiments });
  } catch (error) {
    console.error('감정 점수 API 오류:', error);
    return NextResponse.json(
      { error: '감정 점수 조회 실패' },
      { status: 500 }
    );
  }
}