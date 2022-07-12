import theAxios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store/index.js'

theAxios.defaults.withCredentials = true

const axios = theAxios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('token')) {
      if (config.method === 'post') {
        config.data = {
          cookie: localStorage.getItem('token'),
          ...config.data,
        }
      } else if (config.method === 'get') {
        config.params = {
          cookie: localStorage.getItem('token'),
          ...config.params,
        }
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.status === 803) {
      Message('登陆成功')
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 400) {
      Message(error.response.data.message)
      // alert(error.response.data.message)
      if (error.response.data.message == '请完成验证操作') {
        store.state.loginShow = true
      }
    }
    if (error.response.status === 404) {
    }
    if (error.response.status === 410) {
      alert('该账号未注册')
    }
    return Promise.reject(error)
  }
)

export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {},
}) => {
  return axios({
    url,
    method,
    params,
    data,
    headers,
  })
}
