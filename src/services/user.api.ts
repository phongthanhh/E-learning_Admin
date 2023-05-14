import { GROUP_CODE } from 'constant'
import {
  ListResponse, MemberType,
  SearchParams, User, UserNameParams, UserToCreate,
  UserRegister, CourseQuery, CourseData, UserNameQuery, Admin
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

const getUsersUnregisterApi = (data: CourseQuery): Promise<UserRegister[]> => {
  const url = Endpoint.UNREGISTER_USERS
  return axiosClient.post(url, data)
}

const getUsersRegisterApi = (data: CourseQuery): Promise<UserRegister[]> => {
  const url = Endpoint.REGISTER_USERS
  return axiosClient.post(url, data)
}

const getWaitingUsersApi = (data: CourseQuery): Promise<UserRegister[]> => {
  const url = Endpoint.WAITING_USERS
  return axiosClient.post(url, data)
}

const getRegisteredCourseOfUserApi = (data: UserNameQuery): Promise<CourseData[]> => {
  const url = Endpoint.GET_REGISTERED_COURSES
  return axiosClient.post(url, data)
}

const getUnregisteredCourseOfUserApi = (queryParams: UserNameParams): Promise<CourseData[]> => {
  const q = queryString.stringify(queryParams)
  const url = `${Endpoint.GET_UNREGISTER_COURSES}?${q}`
  return axiosClient.post(url, queryParams)
}

const getCoursesWaitingApproveApi = (data: UserNameQuery): Promise<CourseData[]> => {
  const url = Endpoint.COURSES_WAITING_FOR_APPROVE
  return axiosClient.post(url, data)
}

const getAdminInfoApi = (): Promise<Admin | false> => {
  const url = Endpoint.GET_ADMIN_INFO
  return axiosClient.post(url).then((res) => res.data).catch(() => false)
}

export {
  getUsersWithPagApi, getMemberTypesApi,
  createUserApi, updateUserApi, delUserApi, getUsersUnregisterApi, getUsersRegisterApi,
  getWaitingUsersApi, getRegisteredCourseOfUserApi, getUnregisteredCourseOfUserApi
  , getCoursesWaitingApproveApi, getAdminInfoApi
}
