import { NextResponse } from 'next/server';
import { getStockNews } from '@/services/stockNewsService';

export async function GET() {
  try {
    const stocks = await getStockNews('AAPL');
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stocks' }, 
      { status: 500 }
    );
  }
}