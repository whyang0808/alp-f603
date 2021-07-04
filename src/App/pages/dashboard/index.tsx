import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Layout } from 'antd'

import { AuthContext } from '../../shared/context/auth-context'
import axios from '../../shared/axios/axios'
import CheckList from './checkList'

const { Content } = Layout

const DashBoard: React.FC = (props) => {
  const context = useContext(AuthContext)
  const history = useHistory()

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
    <Content style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Button type='primary' onClick={() => history.push('/case/create')}>
          Create New Case
        </Button>
      </div>
      <CheckList />
    </Content>
  )
}

export default DashBoard
