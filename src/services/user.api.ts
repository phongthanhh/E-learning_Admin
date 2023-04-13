import { GROUP_CODE } from 'constant'
import {
  IListResponse, IMemberType, ISearchParams, IUser, IUserToCreate
} from 'models'
import queryString from 'query-string'
import axiosClient from './api'
import { Endpoint } from './endpoint.api'

const getUsersWithPagApi = (queryParams: ISearchParams):
Promise<IListResponse<IUser>> => {
  const newQueryParams = { MaNhom: GROUP_CODE, ...queryParams }
  if (newQueryParams.tuKhoa === '') {
    delete newQueryParams.tuKhoa
  }
  const q = queryString.stringify(newQueryParams)
  const url = `${Endpoint.GET_USER_WITH_PAG}?${q}`
  return axiosClient.get(url)
}

const getMemberTypesApi = (): Promise<IMemberType[]> => {
  const url = Endpoint.GET_MEMBER_TYPES
  return axiosClient.get(url)
}

const createUserApi = (data: IUserToCreate) => {
  const url = Endpoint.CREATE_USER
  return axiosClient.post(url, data)
}

const updateUserApi = (data:IUserToCreate) => {
  const url = Endpoint.UPDATE_USER
  return axiosClient.put(url, data)
}

export {
  getUsersWithPagApi, getMemberTypesApi, createUserApi, updateUserApi
}
