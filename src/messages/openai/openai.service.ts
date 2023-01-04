import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private CONTEXT_INSTRUCTION = 'Based on this context:';
  private INSTRUCTION = `Answer the question below as truthfully as you can, if you don't know the answer, say you don't know in a sarcastic way otherwise, just answer.`;
  private openai;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createEmbedding(prompt) {
    const { data: embed } = await this.openai.createEmbedding({
      input: prompt,
      model: 'text-embedding-ada-002',
    });

    return embed;
  }

  async createCompletion(prompt, context) {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${this.CONTEXT_INSTRUCTION}\n\n\nContext: "${context}" \n\n\n${this.INSTRUCTION} \n\n\n ${prompt}`,
      max_tokens: 250,
      temperature: 0.2,
    });

    return completion?.data.choices?.[0]?.text;
  }
}
