// 练习demo
import axios from 'axios'

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})
// 模拟get请求
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'xdyy',
//       age: 199
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'harr',
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// 配置一些基本选项
axios.defaults.baseURL = 'http://httpbin.org'

axios
  .post('/post', {
    data: {
      name: 'harr',
      age: 19
    }
  })
  .then((res) => {
    console.log(res.data)
  })
// 发送多个请求
axios
  .all([
    axios.get('/get', { params: { name: 'har' } }),
    axios.post('/post', { data: { name: 'hhhxxx' } })
  ])
  .then((res) => {
    console.log(res[0], res[1])
  })
// 拦截器
// fn1：请求发送成功
// fn2：请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 1.给请求添加一些token
    // 2.isloading动画
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
// 服务器响应拦截
axios.interceptors.response.use(
  (res) => {
    console.log('success')
    return res
  },
  (err) => {
    console.log('failed')
    return err
  }
)
