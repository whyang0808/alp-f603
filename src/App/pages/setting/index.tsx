import React, { useEffect, useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'
import NavBar from '../../components/layouts/NavBar'
import SideBar from '../../components/layouts/SideBar'
import axios from '../../shared/axios/axios'

interface SettingProps {
    text?: string;
}

const Setting: React.FC<SettingProps> = (props) => {
  const context = useContext(AuthContext)

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const result = await axios({
  //         method: 'get',
  //         url: '/user/setting',
  //         headers: {
  //           authorization: context.token
  //         }
  //       })
  //       // const data = result.data
  //       // console.log('data', data)
  //     } catch (err) {
  //       console.log('error setting', err)
  //     }
  //   })()
  // }, [context.token])

  return (
    <NavBar>
      {/* SideBar will dynamically decide on which content component to render */}
      <SideBar />
    </NavBar>
  )
}

export default Setting
