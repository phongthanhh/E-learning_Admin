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

export interface ISearchParams extends IPagination {
  MaNhom?: string
  tuKhoa?: string
}

export interface IUserNameParams {
  TaiKhoan: string
}

export interface IListResponse<T> extends IPaginationResponse {
  items: T[]
}
