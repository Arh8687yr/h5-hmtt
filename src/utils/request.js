import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 大数字处理
// 获取到服务器返回的数据，并且是在处理数据之前使用
// transformResponse 是在响应拦截器之前执行
instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 在请求发送之前判断仓库中是否携带token 如果有 就将token 保存到 headers 中
  // 如果没有，则不做处理
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return response

  // 因为在返回的接口数据中都有data ，所以在此处统一返回接口返回的data
  // 如果接口返回没有data ,就返回axios响应对象的data属性
  return response.data.data || response.data
}, async function (error) {
  // 判断状态码是否是401
  if (error.response.status === 401) {
    // 如果是401使用refresh_token交换新的token
    const refreshToken = store.state.token.refresh_token
    try {
      const data = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // data中有新的2小时可用的token
      const token = data.data.data.token
      // console.log(token)
      // 存储新的token
      store.commit('changeToken', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送上一次401请求
      return instance(error.config)
    } catch (err) {
      router.push('/login')
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
