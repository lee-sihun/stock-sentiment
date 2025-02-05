import { NextResponse } from 'next/server';
import { getStocksByPage } from '@/services/getStocks';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const stocks = await getStocksByPage(Number(page))

    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: '주식 데이터 조회 실패' }, 
      { status: 500 }
    );
  }
}