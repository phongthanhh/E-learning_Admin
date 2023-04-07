/* eslint-disable arrow-body-style */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { BASE_URL, TOKEN_CYBER } from 'constant'
import { toast } from 'react-toastify'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    TokenCybersoft: TOKEN_CYBER,
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmluaGtyMTIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTY3OTcyNTAzMywiZXhwIjoxNjc5NzI4NjMzfQ.3vyD1vfCpeTag_TzwPyYsIl5WiFYlWBCas0hP_NAakw'
  },
  timeout: 0
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (configure: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    const newConfigure = { ...configure }

    return newConfigure
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data // Just get data from response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error (ex: show toast)
    toast.error(error.response?.data)
    return Promise.reject(error)
  }
)

export default axiosClient
