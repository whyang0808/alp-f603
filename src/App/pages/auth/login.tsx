import React, { useContext } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom'

import axios from '../../shared/axios/axios'
import { ROLE } from '../../shared/constants'
import { AuthContext } from '../../shared/context/auth-context'
import responseHandler from '../../utils/respHandler'
import { SubmitValues } from './interfaces'

const layout = {
  wrapperCol: {
    span: 12
  },
  style: {
    display: 'flex',
    justifyContent: 'center'
  }
}

interface LocationState {
  from?: {
    pathname?: string;
  };
}

const Login: React.FC = (props) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation<LocationState>()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (values: SubmitValues) => {
    try {
      const { data: { token } = {} } = await axios.post('/user/login', values)
      if (token) {
        login('60c6fb6c103c162d55b357ff', ROLE.UNKNOWN, token)

        let pathname = '/'
        if (location.state?.from?.pathname) {
          pathname = location.state?.from?.pathname
        }

        message.destroy()
        return history.push(pathname)
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage === 'EMAIL_OR_PASSWORD_WRONG') {
        responseHandler(new Error('Incorrect username or password'), 'error')
      } else if (responseMessage === 'Internal server error') {
        responseHandler(new Error(responseMessage), 'error')
      } else {
        responseHandler(err, 'error')
      }
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        form={form}
        style={{ width: '100%' }}
        name='login-form'
        onFinish={handleSubmit}
      >
        <Form.Item {...layout}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>LOG IN</div>
        </Form.Item>

        <Form.Item
          name='email'
          {...layout}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input placeholder='E-mail' />
        </Form.Item>

        <Form.Item
          name='password'
          {...layout}
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item {...layout}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Submit
          </Button>

          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2%' }}>
            <Link to='/forgot'>Forgot Password</Link>
            <div style={{ margin: '0 2%' }}>|</div>
            <Link to='/signup'>Sign up for an account</Link>
          </div>
        </Form.Item>

        <Form.Item {...layout}>
          <hr style={{ color: 'grey' }} />
          <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '2%' }}>
            <Link to='/'>Privacy Policy</Link>
            <div>|</div>
            <Link to='/signup'>Terms of Conditions</Link>
            <div>|</div>
            <div>Alp-f603 ©2021</div>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login
