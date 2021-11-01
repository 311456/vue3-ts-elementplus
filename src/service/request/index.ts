import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ILoadingInstance } from 'element-plus'

const DEFAULT_LOADING = true
//3.逐步传值 responseInterceptor?: (res: T) => T
interface HXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  // 原始类型 responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responsetInterceptorCatch?: (err: any) => any
}
// 使接口更加独立
//2.逐步传值 HXRequestInterceptors<T>
interface HXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HXRequestInterceptors<T>
  // 储存loading的值
  showLoading?: boolean
}

class HXRequest {
  instance: AxiosInstance
  interceptor?: HXRequestInterceptors
  showLoading?: boolean
  loading?: ILoadingInstance

  constructor(config: HXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptor = config.interceptors

    // 对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responsetInterceptorCatch
    )
    // 所有的实例都有的拦截器(先添加先响应)
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('all request success')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据呢~~',
            background: 'rgba(0.0.0.0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('all request falied')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        // 方便查看loading的效果
        // setTimeout(() => {
        //   this.loading?.close()
        // }, 1000)

        // console.log('all response success')
        // const data = res.data
        // if (data.returnCode === 'false') {
        //   console.log('具体错误码')
        // } else {
        //   return data
        // }
        return res.data
      },
      (err) => {
        this.loading?.close()

        // setTimeout(() => {
        //   this.loading?.close()
        // }, 1000)
        console.log('all response falied')
        // 浏览器判断码
        if (err.response.status === 404) {
          console.log('404 not found')
        }
        return err
      }
    )
  }
  // 1.逐步传值 HXRequestConfig<T>
  request<T>(config: HXRequestConfig<T>): Promise<T> {
    // 写成promise可以在使用时明确知道返回值的类型
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        // 4.修改res的类型（默认是AxiosResponse类型）
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          resolve(res)
          // 将初始值设置为true，防止下一次的loading受影响
          this.showLoading = DEFAULT_LOADING
          return res
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  // 各种请求方法通过调用request方法实现
  get<T>(config: HXRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'GET' })
  }
  post<T>(config: HXRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'POST' })
  }
  delete<T>(config: HXRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HXRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'PATCH' })
  }
}

export default HXRequest
