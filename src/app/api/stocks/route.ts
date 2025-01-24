import { NextResponse } from 'next/server';
import { getMarketCapRanking } from '@/services/marketCapRankService';

export async function GET() {
  try {
    const stocks = await getMarketCapRanking();
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stocks' }, 
      { status: 500 }
    );
  }
}