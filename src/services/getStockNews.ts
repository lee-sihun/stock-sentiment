import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsArticle } from '@/types/news';
import { NEWS } from '@/config/constants';

export async function getStockNews(symbol: string): Promise<NewsArticle[]> {
  try {
    const url = `https://news.google.com/search?q=${encodeURIComponent(symbol)}%20when%3A1d&hl=en-US&gl=US&ceid=US%3Aen`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    return $('body > c-wiz > div > main > div:nth-child(2) > c-wiz > c-wiz')
      .slice(0, NEWS.NEWS_COUNT)
      .map((_, element) => {
        const $article = $(element).find('article');
        const headline = $article.find('a[target="_blank"]').text().trim();
        const rawThumbnailUrl = $article.find('figure img').attr('srcset')?.split(' ')[0];
        const link = $article.find('a[target="_blank"]').attr('href')?.replace('./read/', 'https://news.google.com/read/');
        const source = $article.find('div[data-n-tid="9"]').text().trim();
        const publishedAt = $article.find('time[datetime]').attr('datetime');
        
        
        // 썸네일 URL 조합
        const thumbnailUrl = rawThumbnailUrl 
          ? `https://news.google.com${rawThumbnailUrl.replace(/-w\d+-h\d+-p-df(-rw)?$/, '')}` 
          : '';
          
        return headline && publishedAt && link ? {
          headline,
          thumbnailUrl,
          link,
          source,
          publishedAt,
        } : null;
      })
      .get()
      .filter((item): item is NewsArticle => item !== null);

  } catch (error) {
    console.error('뉴스 데이터 조회 실패:', error);
    throw error;
  }
}