import { GROUP_CODE } from 'constant'
import {
  ListResponse, MemberType, SearchParams, User, UserNameParams, UserToCreate
} from 'models'
import queryString from 'query-string'
import axiosClient from './api'
import { Endpoint } from './endpoint.api'

const getUsersWithPagApi = (queryParams: SearchParams):
Promise<ListResponse<User>> => {
  const newQueryParams = { MaNhom: GROUP_CODE, ...queryParams }
  if (newQueryParams.tuKhoa === '') {
    delete newQueryParams.tuKhoa
  }
  const q = queryString.stringify(newQueryParams)
  const url = `${Endpoint.GET_USER_WITH_PAG}?${q}`
  return axiosClient.get(url)
}

const getMemberTypesApi = (): Promise<MemberType[]> => {
  const url = Endpoint.GET_MEMBER_TYPES
  return axiosClient.get(url)
}

const createUserApi = (data: UserToCreate) => {
  const url = Endpoint.CREATE_USER
  return axiosClient.post(url, data)
}

const updateUserApi = (data: UserToCreate) => {
  const url = Endpoint.UPDATE_USER
  return axiosClient.put(url, data)
}

const delUserApi = (queryParams: UserNameParams) => {
  const q = queryString.stringify(queryParams)
  const url = `${Endpoint.DEL_USER}?${q}`
  return axiosClient.delete(url)
}

export {
  getUsersWithPagApi, getMemberTypesApi, createUserApi, updateUserApi, delUserApi
}
