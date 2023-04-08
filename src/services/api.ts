/* eslint-disable arrow-body-style */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { BASE_URL, Storage, TOKEN_CYBER } from 'constant'
import { toast } from 'react-toastify'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    TokenCybersoft: TOKEN_CYBER
  },
  timeout: 0
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (configure: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    const newConfigure = { ...configure }

    const accessTokenInLocal = localStorage.getItem(Storage.ACCESS_TOKEN)
    if (accessTokenInLocal) {
      newConfigure.headers.Authorization = `Bearer ${accessTokenInLocal}`
    }

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
