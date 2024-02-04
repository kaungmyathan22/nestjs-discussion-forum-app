import type { FindOptionsWhere, Repository } from 'typeorm';

import {
  PaginatedParamsDto,
  PaginatedResponse,
} from 'src/common/dto/pagination.dto';
import { AbstractRepository } from 'src/database/abstract.repository';
import { AnswerEntity } from '../entities/answer.entity';

export interface AnswerRepository extends Repository<AnswerEntity> {
  this: Repository<AnswerEntity>;
  findAllWithPaginated(
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<AnswerEntity>,
  ): Promise<PaginatedResponse<AnswerEntity>>;
}

export const customAnswerEntityRepositoryMethods: Pick<
  AnswerRepository,
  'findAllWithPaginated'
> = {
  findAllWithPaginated(
    this: Repository<AnswerEntity>,
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<AnswerEntity>,
  ) {
    return AbstractRepository.findAllWithPaginated(
      this,
      queryParams,
      filterQuery,
      ['author'],
      { createdAt: 'DESC' },
    );
  },
};
