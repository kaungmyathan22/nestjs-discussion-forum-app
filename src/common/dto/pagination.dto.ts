export class PaginatedParamsDto {
  page?: number = 1;
  pageSize?: number = 10;
  query?: string = '';
}
export interface PaginatedResponse<T> {
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
  page: number;
  pageSize: number;
  data: T[];
}
