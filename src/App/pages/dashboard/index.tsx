import React, { useEffect, useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import NavBar from '../../components/layouts/NavBar'
import axios from '../../shared/axios/axios'

interface DashBoardProps {
    text?: string;
}

const DashBoard: React.FC<DashBoardProps> = (props) => {
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
      {props.text || 'Home Page'}
    </NavBar>
  )
}

export default DashBoard
