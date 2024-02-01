import {
  PaginatedParamsDto,
  PaginatedResponse,
} from 'src/common/dto/pagination.dto';
import { AbstractRepository } from 'src/database/abstract.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';

export interface QuestionEntityRepository extends Repository<QuestionEntity> {
  this: Repository<QuestionEntity>;

  findAllWithPaginated(
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<QuestionEntity>,
  ): Promise<PaginatedResponse<QuestionEntity>>;
}

export const customQuestionEntityRepositoryMethods: Pick<
  QuestionEntityRepository,
  'findAllWithPaginated'
> = {
  findAllWithPaginated(
    this: Repository<QuestionEntity>,
    queryParams?: PaginatedParamsDto,
    filterQuery?: FindOptionsWhere<QuestionEntity>,
  ) {
    return AbstractRepository.findAllWithPaginated(
      this,
      queryParams,
      filterQuery,
    );
  },
};
