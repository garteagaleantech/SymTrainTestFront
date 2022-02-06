export type PaginatedResponseAttr<T> = {
  data: T;
  total: number;
  page: number;
  pages: number;
  limit: number;
  sortBy: string;
  orderBy: string;
};
