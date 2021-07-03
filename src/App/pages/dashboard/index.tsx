import React, { useEffect, useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import NavBar from '../../components/layouts/NavBar'
import axios from '../../shared/axios/axios'
import CheckList from './CheckList'

const DashBoard: React.FC = (props) => {
  const context = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios({
          method: 'get',
          url: '/user/dashboard',
          headers: {
            authorization: context.token
          }
        })
        // const data = result.data
        // console.log('data', data)
      } catch (err) {
        console.log('error dashboard', err)
      }
    })()
  }, [context.token])

  return (
    <NavBar>
      <CheckList />
    </NavBar>
  )
}

export default DashBoard
