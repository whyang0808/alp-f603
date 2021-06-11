import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

// import responseHandler from '../../../utils/respHandler'
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

const Login: React.FC = (props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: SubmitValues) => {
    console.log('Success:', values)
    // HTTP Request to create user account & check for duplication & wait for admin approval
    // responseHandler('Thank You! Please wait for approval', 'success')
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
