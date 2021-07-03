import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import axios from '../../shared/axios/axios'
import { AuthContext } from '../../shared/context/auth-context'
import responseHandler from '../../utils/respHandler'
import { CompanySubmitValues } from './interfaces'

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

  const handleSubmit = async (values: CompanySubmitValues) => {
    try {
      const { status } = await axios.post('/company/create', { ...values, userId })
      if (status === 200) {
        history.push('/')
        return responseHandler('We\'ve sent request to our admin. You\'ll be notified through your email once the request is approved.', 'success', 5)
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage === 'COMPANY_EXISTS') {
        // TODO: Perhaps this message can be split into 2 different messages like "Company registration is pending approval"
        // and "Company account exists" (if the registration has been approved)
        responseHandler('Company exists already', 'warning')
      } else if (responseMessage) {
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
          name='registrationId'
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
          name='name'
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
        </Form.Item>
      </Form>
    </div>
  )
}

export default CompanySignup
