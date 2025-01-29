import openai from '@/lib/openai';
import { AI } from '@/config/constants';

export async function analyzeHeadlines(company: string, headlines: string[]): Promise<string> {
  const prompt = `Forget all your previous instructions. Pretend you are a financial expert. You are a financial expert with stock recommendation experience. Answer only with "1" if good news, "-1" if bad news, or "0" if uncertain. Do not provide any explanation or additional text. Is this headline good or bad for the stock price of ${company} in the short term?
${headlines.map((headline, index) => `Headline${index + 1}: ${headline}`).join('\n')}`;

  try {
    const response = await openai.chat.completions.create({
      model: AI.MODEL,
      temperature: 0,
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    return response.choices[0]?.message.content || '응답을 받지 못했습니다.';
  } catch (error) {
    console.error('AI 응답 실패:', error);
    throw error;
  }
}