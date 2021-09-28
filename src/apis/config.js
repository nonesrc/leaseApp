import axios from 'axios'
import { handleError, API, getRouter } from '../util'

// axios基本配置
const Axios = axios.create({
  baseURL: API,
})

// 当前所有请求
const currentReq = new Map()

/**
 * 添加当前请求
 * @param {import('axios').AxiosRequestConfig} config
 */
function addReq(config) {
  const reqToken = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!currentReq.has(reqToken)) currentReq.set(reqToken, cancel)
    })
}

/**
 * 删除当前重复的请求
 * @param {import('axios').AxiosRequestConfig} config
 */
function delReq(config) {
  const reqToken = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
  if (currentReq.has(reqToken)) {
    const cancel = currentReq.get(reqToken)
    cancel(reqToken)
    currentReq.delete(reqToken)
  }
}

/**
 * 清空请求
 */
function cleanReq() {
  for (const [url, cancel] in currentReq) {
    cancel(url)
  }
  currentReq.clear()
}

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    delReq(config)
    addReq(config)
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
Axios.interceptors.response.use(
  response => {
    delReq(response)
    if (response.status !== 200 || response.data.code !== 2000)
      handleError(response.data, getRouter())
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 *
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const ARFactory = async config => Axios(config)

export { Axios, cleanReq, ARFactory }
