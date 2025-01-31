import { NextResponse } from 'next/server';
import { getStocks } from '@/services/getStocks';

export async function GET() {
  try {
    const stocks = await getStocks();
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: '주식 데이터 조회 실패' }, 
      { status: 500 }
    );
  }
}