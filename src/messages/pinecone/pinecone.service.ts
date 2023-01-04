import { Injectable } from '@nestjs/common';
import { PineconeClient } from 'pinecone-client';

@Injectable()
export class PineconeService {
  private pinecone;
  constructor() {
    this.pinecone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY,
      baseUrl: process.env.PINECONE_BASE_URL,
      namespace: process.env.PINECONE_NAMESPACE,
    });
  }

  upsert(vectors) {
    return this.pinecone.upsert({
      vectors: [vectors],
    });
  }

  async query(vector) {
    const { matches } = await this.pinecone.query({
      vector,
      topK: 10,
      includeMetadata: true,
      includeValues: false,
    });

    return matches
      .filter((match) => match.score > 0.8)
      .map((match) => parseInt(match.id));
  }
}
