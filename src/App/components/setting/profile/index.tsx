import React, { useEffect, useContext, useCallback } from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd'
import moment from 'moment'

import { AuthContext } from '../../../shared/context/auth-context'
import axios from '../../../shared/axios/axios'
import responseHandler from '../../../utils/respHandler'

interface IUserProfileProps {
  onChangePassword: React.Dispatch<React.SetStateAction<Boolean>>
}

const { Option } = Select

const layout = {
  labelCol: {
    md: {
      span: 24
    },
    lg: {
      span: 6
    }
  },
  wrapperCol: {
    md: {
      span: 24
    },
    lg: {
      span: 8
    }
  }
}

const tailLayout = {
  wrapperCol: {
    sm: {
      span: 24,
      offset: 0
    },
    lg: {
      span: 8,
      offset: 6
    }
  }
}

const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const [form] = Form.useForm()
  const context = useContext(AuthContext)
  const { token, userId } = context

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `/user/get-user-info/${userId}`,
          {
            headers: {
              authorization: token
            }
          }
        )

        if (result.status === 200) {
          const { firstName, lastName, idType, idNumber, email, birthDate } = result.data
          form.setFieldsValue({
            firstName,
            lastName,
            idType,
            idNumber,
            email,
            birthDate: moment(birthDate)
          })
        }
      } catch (err) {
        const responseMessage = err.response?.data?.message
        if (responseMessage === 'Internal server error') {
          responseHandler(new Error(responseMessage), 'error')
        } else {
          responseHandler(err, 'error')
        }
        console.log('err', err)
      }
    })()
  }, [userId, token, form])

  const handleSubmit = useCallback<(values: any) => void>(
    async (values) => {
      const modifiedValues = {
        ...values,
        birthDate: values.birthDate!.format('YYYY-MM-DD')
      }

      try {
        const { status } = await axios.post(
          '/user/update',
          modifiedValues,
          {
            headers: {
              authorization: token
            }
          }
        )

        if (status === 200) {
          return responseHandler('Profile updated succesfully', 'success')
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
    }, [token])

  const prefixSelector = (
    <Form.Item name='idType' noStyle>
      <Select
        style={{
          width: 100
        }}
      >
        <Option value='ic'>IC</Option>
        <Option value='passportNo'>Passport</Option>
      </Select>
    </Form.Item>
  )

  return (
    <Form
      {...layout}
      form={form}
      name='user-profile'
      onFinish={handleSubmit}
    >
      <Form.Item
        label='E-mail'
        name='email'
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label='Identity No.'
        name='idNumber'
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%'
          }}
        />
      </Form.Item>

      <Form.Item
        name='firstName'
        label='First/Given Name'
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='lastName'
        label='Last/Surname Name'
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='birthDate'
        label='Birth Date'
      >
        <DatePicker format='YYYY-MM-DD' />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>

        <Button type='link' onClick={() => props.onChangePassword(true)}>
          Change Password
        </Button>

      </Form.Item>
    </Form>
  )
}

export default UserProfile
