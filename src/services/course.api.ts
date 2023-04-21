import { GROUP_CODE } from 'constant'
import {
  Course, CourseCategory, CourseToCreate, ListResponse, SearchParams
} from 'models'
import queryString from 'query-string'
import axiosClient from './api'
import { Endpoint } from './endpoint.api'

const getCoursesWithPagApi = (queryParams: SearchParams):
Promise<ListResponse<Course>> => {
  const newQueryParams = { MaNhom: GROUP_CODE, ...queryParams }
  if (newQueryParams.tenKhoaHoc === '') {
    delete newQueryParams.tenKhoaHoc
  }
  const q = queryString.stringify(newQueryParams)
  const url = `${Endpoint.GET_COURSE_WITH_PAG}?${q}`
  return axiosClient.get(url)
}

const createCourseApi = (data: CourseToCreate) => {
  const url = Endpoint.CREATE_COURSE
  return axiosClient.post(url, data)
}

const getCourseCategoryApi = (): Promise<CourseCategory[]> => {
  const url = Endpoint.GET_COURSE_CATEGORY
  return axiosClient.get(url)
}

export {
  getCoursesWithPagApi, createCourseApi, getCourseCategoryApi
}
