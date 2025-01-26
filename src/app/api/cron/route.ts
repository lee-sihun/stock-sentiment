import { NextResponse } from 'next/server';
import { updateStockRank } from '@/services/updateStockRank';
import { createStockNews } from '@/services/createStockNews';

export const dynamic = 'force-dynamic'; // 동적 라우트 

export async function GET(request: Request) {
  // 인증 토큰 검증
  const authToken = request.headers.get('x-cron-secret');
  
  if (authToken !== process.env.CRON_SECRET_TOKEN) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    await updateStockRank();
    await createStockNews();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API 요청 실패:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}