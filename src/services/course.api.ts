import { GROUP_CODE } from 'constant'
import { ListResponse, SearchParams } from 'models'
import { Course } from 'models/course'
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

export {
  getCoursesWithPagApi
}
