import React from 'react'
import { Form, Input, Button } from 'antd'
import { omit } from 'lodash'

import responseHandler from '../../../utils/respHandler'
import { SubmitValues } from './interfaces'

const inputLayout = {
  labelCol: {
    offset: 4
  },
  wrapperCol: {
    offset: 6,
    span: 12
  }
}

const layout = {
  wrapperCol: {
    offset: 6,
    span: 12
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
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <Form
        {...inputLayout}
        form={form}
        style={{ width: '100%' }}
        name='create-user-form'
        initialValues={{
          idType: 'ic'
        }}
        onFinish={handleSubmit}
      >
        <Form.Item {...layout}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>Log in</div>
        </Form.Item>

        <Form.Item
          name='email'
        //   label='E-mail'
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
        //   label='Password'
          name='password'
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
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login
