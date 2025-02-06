import { NextResponse } from 'next/server';
import { getStocksList } from '@/services/stocks/getStocks';

export async function GET() {
  try {
    const stocks = await getStocksList();
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('주식 리스트 API 오류:', error);
    return NextResponse.json(
      { error: '주식 리스트 조회 실패' },
      { status: 500 }
    );
  }
}