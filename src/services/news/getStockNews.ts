import axios from 'axios';
import { supabase } from '@/lib/supabase';
import * as cheerio from 'cheerio';
import { NewsArticle } from '@/types/news';
import { NEWS } from '@/config/constants';

export async function getStockNews(symbol: string): Promise<NewsArticle[]> {
  try {
    const url = `https://news.google.com/search?q=${encodeURIComponent(symbol)}%20when%3A1d&hl=en-US&gl=US&ceid=US%3Aen`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const articles = $('body > c-wiz > div > main > div:nth-child(2) > c-wiz > c-wiz')
      .slice(0, NEWS.NEWS_COUNT)
      .map((_, element) => {
        const $article = $(element).find('article');
        const headline = $article.find('a[target="_blank"]').text().trim();
        const rawThumbnailUrl = $article.find('figure img').attr('srcset')?.split(' ')[0];
        const link = $article.find('a[target="_blank"]').attr('href')?.replace('./read/', 'https://news.google.com/read/');
        const source = $article.find('div[data-n-tid="9"]').text().trim();
        const published_at = $article.find('time[datetime]').attr('datetime');
        
        // 썸네일 URL 조합 및 유효성 검사
        const thumbnail_url = rawThumbnailUrl 
          ? `https://news.google.com${rawThumbnailUrl.replace(/-w\d+-h\d+-p-df(-rw)?$/, '')}` 
          : 'https://via.placeholder.com/300x200?text=No+Image'; // 기본 이미지 URL
          
        return headline && published_at && link && thumbnail_url ? {
          headline,
          thumbnail_url,
          link,
          source: source || 'Unknown',
          published_at,
        } : null;
      })
      .get()
      .filter((article): article is NewsArticle => article !== null);

    // 뉴스가 없는 경우 stocks 테이블에서 제거
    if (articles.length === 0) {
      const { error } = await supabase
        .from('stocks')
        .delete()
        .eq('symbol', symbol);

      if (error) {
        console.error(`${symbol} 종목 제거 실패:`, error);
      }
    }

    return articles;
    
  } catch (error) {
    console.error(`${symbol} 뉴스 수집 실패:`, error);
    return [];
  }
}