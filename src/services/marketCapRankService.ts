import axios from 'axios';
import * as cheerio from 'cheerio';
import { Stock } from '@/types/stock';
import { MARKET } from '@/config/constants';

export async function getMarketCapRanking(): Promise<Stock[]> {
  try {
    const response = await axios.get('https://companiesmarketcap.com/');
    const $ = cheerio.load(response.data);

    return $('#cmkt > div.table-container.shadow > table > tbody > tr:not(.ad-tr)')
      .slice(0, MARKET.TOP_STOCKS_COUNT)
      .map((index, element) => ({
        symbol: $(element).find('.company-code').text().trim(),
        rank: index + 1,
      }))
      .get();

  } catch (error) {
    console.error('시가총액 조회 실패:', error);
    throw error;
  }
}