import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ArticleEntity } from '../entities/article.entity';
import { IArticleSearchResult } from '../interfaces/articleSearch.interface';
@Injectable()
export class ArticleSearchService {
  _index = 'articles';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexArticle(article: ArticleEntity) {
    return this.elasticsearchService.index({
      index: this._index,
      body: {
        id: article.id,
        title: article.title,
        content: article.content,
        authorId: article.author.id,
      },
    });
  }

  async searchArticles(text: string) {
    const { hits } =
      await this.elasticsearchService.search<IArticleSearchResult>({
        index: this._index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['title', 'content'],
            },
          },
        },
      });
    const _hits = hits.hits;
    return _hits.map((item) => item._source);
  }
}
