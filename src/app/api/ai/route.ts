import { NextResponse } from 'next/server';
import { analyzeHeadlines } from '@/services/analyzeHeadlines';

export async function GET() {
  try {
    const headlines = [
      'NVDA, AVGO and AMD Forecast – Chips Look to Recover on Tuesday',
      'JPMorgan Vs. OppFi: Which Stock Is The Better Buy? (JPM)(OPFI)',
      'Earthquake in Maine, NH: Will there be aftershocks? How rare was it? Experts explain'
    ];

    const answer = await analyzeHeadlines('AAPL', headlines );
    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stocks' }, 
      { status: 500 }
    );
  }
}