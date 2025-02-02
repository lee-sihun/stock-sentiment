import { NextResponse } from 'next/server';
import { verifySentiments } from '@/services/verifySentiments';

export async function GET() {
  try {
     const sentiment =  await verifySentiments();
     return NextResponse.json({ sentiment });
  } catch (error) {
    console.error('감정 점수 API 오류:', error);
    return NextResponse.json(
      { error: '감정 점수 조회 실패' },
      { status: 500 }
    );
  }
}