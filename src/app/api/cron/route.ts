import { NextResponse } from 'next/server';
import { updateStockRank } from '@/services/updateStockRank';

// Vercel Cron Job 설정
export const revalidate = 0; // 캐시 비활성화 
export const dynamic = 'force-dynamic'; // 동적 라우트 

export async function GET() {
  try {
    await updateStockRank();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API 요청 실패:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}