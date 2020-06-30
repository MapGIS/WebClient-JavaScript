import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 5000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    /* Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    }) */
    return Promise.reject(error)
  }
)

export default service
