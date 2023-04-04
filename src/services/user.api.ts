import { GROUP_CODE } from 'constant'
import { IListResponse, IPagination, IUser } from 'models'
import queryString from 'query-string'
import axiosClient from './api'
import { Endpoint } from './endpoint.api'

interface IQueryParamsOfGetUserWithPag extends IPagination {
  MaNhom?: string
  tuKhoa?: string
}

const getUsersWithPagApi = (queryParams: IQueryParamsOfGetUserWithPag):
Promise<IListResponse<IUser>> => {
  const newQueryParams = { MaNhom: GROUP_CODE, ...queryParams }
  const q = queryString.stringify(newQueryParams)
  const url = `${Endpoint.GET_USER_WITH_PAG}?${q}`
  return axiosClient.get(url)
}

export { getUsersWithPagApi }
