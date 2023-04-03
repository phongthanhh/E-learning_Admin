import { GroupCode } from 'constant'
import { IListResponse, IPaginationQueryParams, IUser } from 'models'
import queryString from 'query-string'
import axiosClient from './api'
import { Endpoint } from './endpoint.api'

interface IQueryParamsOfGetUserWithPag extends IPaginationQueryParams {
  MaNhom?: GroupCode
  tuKhoa?: string
}

const getUsersWithPagApi = (queryParams: IQueryParamsOfGetUserWithPag):
Promise<IListResponse<IUser>> => {
  const newQueryParams = { MaNhom: GroupCode.GP01, ...queryParams }
  const q = queryString.stringify(newQueryParams)
  const url = `${Endpoint.GET_USER_WITH_PAG}?${q}`
  return axiosClient.get(url)
}

export { getUsersWithPagApi }
