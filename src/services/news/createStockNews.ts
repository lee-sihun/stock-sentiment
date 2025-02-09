import { supabase } from '@/lib/supabase';
import { getStockNews } from './getStockNews';

export async function createStockNews(): Promise<void> {
  try {
    // 주식 종목 데이터 조회
    const { data: stocks, error: stocksError } = await supabase
      .from('stocks')
      .select('symbol, name')
      .order('rank', { ascending: true });

    if (stocksError) throw stocksError;
    if (!stocks || stocks.length === 0) {
      console.error('주식 종목 데이터가 없습니다.');
      return;
    }

    // 종목 별 뉴스 데이터 저장
    const batchSize = 5; // 배치 사이즈
    for (let i = 0; i < stocks.length; i += batchSize) {
      const batch = stocks.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (stock) => {
        try {
          const newsArticles = await getStockNews(stock.name);

          const formattedNews = newsArticles
            .filter(article => 
              article.headline && 
              article.publishedAt && 
              article.link && 
              article.source
            )
            .map(article => ({
              stock_id: stock.symbol,
              headline: article.headline,
              thumbnail_url: article.thumbnailUrl || null,
              link: article.link,
              source: article.source,
              published_at: article.publishedAt,
              sentiment: 0,
            }));

          if (formattedNews.length > 0) {
            const { error: insertError } = await supabase
              .from('news')
              .insert(formattedNews);

            if (insertError) {
              throw insertError;
            }
          }
        } catch (error) {
          console.error(`${stock.symbol} 처리 중 오류:`, error);
        }
      }));

      // 배치 간 대기
      if (i + batchSize < stocks.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error('뉴스 데이터 생성 실패:', error);
    throw error;
  }
}