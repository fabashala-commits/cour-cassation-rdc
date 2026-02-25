import { Client as ESClient } from '@elastic/elasticsearch';

/**
 * Minimal vector-search skeleton using Elasticsearch dense_vector type.
 * Production-ready vector pipelines require embedding generation (OpenAI, local model),
 * index mapping with `dense_vector`, and careful resource sizing.
 */

export class VectorSearch {
  client: ESClient;

  constructor(node = process.env.ELASTICSEARCH_URL || 'http://localhost:9200') {
    this.client = new ESClient({ node });
  }

  async ensureIndex(index = 'decisions') {
    const exists = await this.client.indices.exists({ index });
    if (!exists) {
      await this.client.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              summary: { type: 'text' },
              embedding: { type: 'dense_vector', dims: 1536 }
            }
          }
        }
      });
    }
  }

  async indexDocument(index: string, id: string, doc: { title: string; summary: string; embedding: number[] }) {
    await this.client.index({ index, id, body: doc, refresh: true });
  }

  async semanticSearch(index: string, queryEmbedding: number[], k = 10) {
    // Basic script_score KNN via cosine similarity
    const script = {
      source: "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
      params: { query_vector: queryEmbedding }
    };

    const resp = await this.client.search({
      index,
      size: k,
      query: { script_score: { query: { match_all: {} }, script } }
    });

    return resp.hits.hits.map(h => ({ id: h._id, score: h._score, source: h._source }));
  }
}
