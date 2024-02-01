import { ApiProperty } from '@nestjs/swagger';

export class PaginatedArticleResponseDto<T> {
  @ApiProperty({ required: false, default: null })
  prevPage: number;

  @ApiProperty({ required: false, default: null })
  nextPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty({ type: 'array', items: { type: 'object', properties: {} } })
  data: T[];
}
