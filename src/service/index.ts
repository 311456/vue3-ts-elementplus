// service统一出口
import HXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '../utils/cache'

const hxRequest = new HXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 每个实例的拦截器
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        // bearer承载：http协议的标准认证方式。
        config.headers.Authorization = `Bearer ${token}`
        console.log(config)
      }
      // console.log('request success')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('request falied')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('response success')
      return res
    },
    responsetInterceptorCatch: (err) => {
      console.log('response failed')
      return err
    }
  }
})
export default hxRequest
