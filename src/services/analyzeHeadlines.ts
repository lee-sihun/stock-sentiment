import openai from '@/lib/openai';
import { AI } from '@/config/constants';

// 재시도 횟수, 딜레이 시간 설정
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function analyzeHeadlines(company: string, headlines: string[]): Promise<number[]> {
  const prompt = `Forget all your previous instructions. Pretend you are a financial expert. You are a financial expert with stock recommendation experience. Answer only with "1" if good news, "-1" if bad news, or "0" if uncertain. Do not provide any explanation or additional text. Is this headline good or bad for the stock price of ${company} in the short term?
${headlines.map((headline, index) => `Headline${index + 1}: ${headline}`).join('\n')}
Respond with exactly ${headlines.length} lines, one number per line, matching the headline numbers.`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`${company} 분석 시작 (시도 ${attempt}/${MAX_RETRIES}), 헤드라인 수: ${headlines.length}`);

      const response = await openai.chat.completions.create({
        model: AI.MODEL,
        temperature: 0,
        messages: [{ role: 'user', content: prompt }]
      });

      // console.log(`API 응답:`, JSON.stringify(response, null, 2));
      if (!response?.choices?.[0]?.message?.content) {
        throw new Error('API 응답 형식 오류');
      }

      const content = response.choices[0].message.content;
      return content.split('\n').map(value => {
        const parsed = parseInt(value);
        return [-1, 0, 1].includes(parsed) ? parsed : 0;
      });
    } catch (error) {
      console.error(`${company} 분석 실패 (시도 ${attempt}/${MAX_RETRIES}):`, error);
      
      if (attempt === MAX_RETRIES) {
        console.warn(`${company} 최대 재시도 횟수 도달, 기본값 반환`);
        return Array(headlines.length).fill(0);
      }
      
      await delay(RETRY_DELAY * attempt); // 재시도마다 대기 시간 증가
    }
  }

  return Array(headlines.length).fill(0);
}