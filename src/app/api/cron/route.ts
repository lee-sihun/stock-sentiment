import { NextResponse } from 'next/server';
import { getMarketCapRanking } from '@/services/marketCapRankService';
import { supabase } from '@/lib/supabase';

// Vercel Cron Job 설정
export const revalidate = 0; // 캐시 비활성화 
export const dynamic = 'force-dynamic'; // 동적 라우트 

export async function GET() {
  try {
    const stocks = await getMarketCapRanking();

    // 기존 데이터 확인
    const { data: existingData, error: selectError } = await supabase
      .from('stocks')
      .select('symbol');

    if (selectError) throw selectError;

    // 데이터가 존재할 경우에만 삭제 수행
    if (existingData && existingData.length > 0) {
      const { error: deleteError } = await supabase
        .from('stocks')
        .delete()
        .gte('rank', 0); 

      if (deleteError) throw deleteError;
    }

    const formattedStocks = stocks.map(stock => ({
      symbol: stock.symbol,
      rank: stock.rank,
    }));

    const { error: insertError } = await supabase
      .from('stocks')
      .insert(formattedStocks);

    if (insertError) throw insertError;

    return NextResponse.json({ 
      message: '시가총액 리스트 업데이트 성공',
      count: stocks.length 
    });
  } catch (error) {
    console.error('API 처리 실패:', error);
    return NextResponse.json(
      { error: '시가총액 리스트 업데이트 실패' }, 
      { status: 500 }
    );
  }
}