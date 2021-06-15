import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

axiosInstance.interceptors.request.use(
  req => {
    console.log('req.url', req.url)
    console.log('Hello')

    return req
  },
  err => {
    console.log('err', err)
  }
)

axiosInstance.interceptors.response.use(
  res => {
    console.log('res.status', res.status)
    return res
  },
  err => {
    if (err.response.status === 401) {
      console.log('error 401')
    }
    return Promise.reject(err)
  }
)

export default axiosInstance
