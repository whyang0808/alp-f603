import React, { useEffect, useContext } from 'react'
import { AxiosInstance } from 'axios'

import { AuthContext } from '../context/auth-context'

const withAxiosHandler = (WrappedComponent: React.FC, axios: AxiosInstance) => (props: any) => {
  const { resetToken } = useContext(AuthContext)

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      req => {
        // console.log('Axios req.url', req.url)
        return req
      },
      err => {
        console.log('Axios reqInterceptorerr', err)
      }
    )
    const resInterceptor = axios.interceptors.response.use(
      res => {
        // console.log('Axios res.status', res)
        if (res.status === 200 && res.config.url === '/auth/refresh') {
          resetToken(res.data.token)
        }
        return res
      },
      err => {
        if (err.response.status === 401 && err.response.data.message === 'TOKEN_EXPIRED') {
          console.log('Axios req error 401', err.response.data.message)
          refetchAuthToken()
        }
        return Promise.reject(err)
      }

    )

    return () => {
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [resetToken])

  const refetchAuthToken = async () => {
    return await axios({
      method: 'post',
      url: '/auth/refresh'
    })
  }

  // console.log('Axios re-rendering!')

  return (
    <WrappedComponent
      {...props}
    />
  )
}

export default withAxiosHandler
