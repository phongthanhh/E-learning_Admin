export interface PaginationResponse {
  currentPage: number
  totalPages: number
  count: number
  totalCount: number
}

export interface Pagination {
  page: number
  pageSize: number
}

export interface SearchParams extends Pagination {
  MaNhom?: string
  tuKhoa?: string
}

export interface UserNameParams {
  TaiKhoan: string
}

export interface ListResponse<T> extends PaginationResponse {
  items: T[]
}
