export interface IPagination {
  currentPage: number
  totalPages: number
  count: number
  totalCount: number
}

export interface IPaginationQueryParams {
  page: number
  pageSize: number
}

export interface IListResponse<T> extends IPagination {
  items: T[]
}
