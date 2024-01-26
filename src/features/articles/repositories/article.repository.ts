import type { FindOptionsWhere, Repository } from 'typeorm';

import {
  PaginatedParamsDto,
  PaginatedResponse,
} from 'src/common/dto/pagination.dto';
import { AbstractRepository } from 'src/database/abstract.repository';
import { ArticleEntity } from '../entities/article.entity';

export interface ArticleEntityRepository extends Repository<ArticleEntity> {
  this: Repository<ArticleEntity>;

  findAllWithPaginated(
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<ArticleEntity>,
  ): Promise<PaginatedResponse<ArticleEntity>>;
}

export const customArticleEntityRepositoryMethods: Pick<
  ArticleEntityRepository,
  'findAllWithPaginated'
> = {
  findAllWithPaginated(
    this: Repository<ArticleEntity>,
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<ArticleEntity>,
  ) {
    return AbstractRepository.findAllWithPaginated(
      this,
      queryParams,
      filterQuery,
      ['tags', 'author'],
      { createdAt: 'DESC' },
    );
  },
};
