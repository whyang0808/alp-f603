import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import axios from '../../shared/axios/axios'
import responseHandler from '../../utils/respHandler'

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

const Forgot: React.FC = (props) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: SubmitValues) => {
    console.log('Success:', values)

    try {
      const result = await axios.post('/user/forgot-password', values)
      if (result.status === 200) {
        return responseHandler('Please check your email', 'success')
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage === 'Details are incorrect') {
        responseHandler('Details are incorrect', 'warning')
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

export default Forgot
