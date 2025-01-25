import { NextResponse } from 'next/server';
import { getStockRank } from '@/services/getStockRank';

export async function GET() {
  try {
    const stocks = await getStockRank();
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stocks' }, 
      { status: 500 }
    );
  }
}