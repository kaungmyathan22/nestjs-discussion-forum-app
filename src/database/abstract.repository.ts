import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';
import { FindOptionsWhere, Repository } from 'typeorm';

export class AbstractRepository {
  static async findAllWithPaginated<T>(
    that: Repository<T>,
    queryParams: PaginatedParamsDto = {},
    filterQuery: FindOptionsWhere<T> = {},
  ) {
    const { page = 1, pageSize = 10 } = queryParams as PaginatedParamsDto;
    const skip = (page - 1) * pageSize;
    const [totalItems, documents] = await Promise.all([
      that.count({ where: filterQuery }),
      that.find({ where: filterQuery, skip, take: pageSize }),
    ]);
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page >= totalPages ? null : +page + 1,
      totalPages: +totalPages,
      totalItems: +totalItems,
      page: +page,
      pageSize: +pageSize,
      data: documents,
    };
  }
}