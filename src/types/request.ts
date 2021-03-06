type PaginatedRequest = {
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortBy?: string;
};

type PaginatedResponseAttr<T> = {
  data: T;
  total: number;
  page: number;
  pages: number;
  limit: number;
  sortBy: string;
  orderBy: string;
};

export type { PaginatedRequest, PaginatedResponseAttr };
