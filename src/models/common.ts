export interface IPaginationResponse {
  currentPage: number
  totalPages: number
  count: number
  totalCount: number
}

export interface IPagination {
  page: number
  pageSize: number
}

export interface IListResponse<T> extends IPaginationResponse {
  items: T[]
}
