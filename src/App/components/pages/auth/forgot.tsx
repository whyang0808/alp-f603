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
        name='forgot-password-form'
        onFinish={handleSubmit}
      >
        <Form.Item {...layout}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            FORGOT PASSWORD?
          </div>
          {/* <div style={{ paddingTop: '3%' }}>
            We'll send the recovery link to
          </div> */}
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

        <Form.Item {...layout}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Send Recovery Link
          </Button>
        </Form.Item>

        <Form.Item {...layout}>
          <hr style={{ color: 'grey' }} />
          <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '2%' }}>
            <Link to='/login'>Return to login</Link>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login
