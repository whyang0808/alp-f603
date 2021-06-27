import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'

import axios from '../../shared/axios/axios'
import { AuthContext } from '../../shared/context/auth-context'
import responseHandler from '../../utils/respHandler'
import { SubmitValues } from './interfaces'

const layout = {
  labelCol: {
    sm: {
      span: 12
    },
    lg: {
      span: 6
    }
  },
  wrapperCol: {
    sm: {
      span: 12
    },
    lg: {
      span: 12
    }
  }
}

const tailLayout = {
  wrapperCol: {
    sm: {
      span: 12
    },
    lg: {
      offset: 6,
      span: 12
    }
  }
}

const CompanySignup: React.FC = (props) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { userId } = useContext(AuthContext)

  const handleSubmit = async (values: SubmitValues) => {
    // TODO: Handle response once backend is ready.
    try {
      const { status } = await axios.post('/company/create', { ...values, userId })
      if (status === 200) {
        message.destroy()
        history.push('/')
        return responseHandler('We\'ve sent request to our admin. You\'ll be notified through your email once the request is approved.', 'success', 5)
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage) {
        responseHandler(new Error(responseMessage), 'error')
      } else {
        responseHandler(err, 'error')
      }
    }
  }

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        name='create-company-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='registrationNumber'
          label='Registration No.'
          rules={[
            {
              required: true,
              message: 'Please input your company\'s registration no.!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='companyName'
          label='Company Name'
          rules={[
            {
              required: true,
              message: 'Please input your company name!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button type='link' onClick={() => history.push('/')}>
            Return to dashboard
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CompanySignup
