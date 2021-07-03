import React, { useContext, useCallback } from 'react'
import { Form, Input, Button } from 'antd'

import { AuthContext } from '../../../shared/context/auth-context'
import axios from '../../../shared/axios/axios'
import responseHandler from '../../../utils/respHandler'

interface IChangePasswordProps {
  onChangePassword: React.Dispatch<React.SetStateAction<Boolean>>
}

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

const ChangePassword: React.FC<IChangePasswordProps> = (props) => {
  const [form] = Form.useForm()

  const context = useContext(AuthContext)
  const { token, logout } = context

  const handleSubmit = useCallback<(value: any) => void>(
    async (values) => {
      // values include confirmPassword, might need to take it our prior to the httpcall
      try {
        const result = await axios.post(
          '/user/update-password',
          values,
          {
            headers: {
              authorization: token
            }
          }
        )
        if (result.status === 200) {
          responseHandler('Password updated succesfully. Please log in with new password', 'success')
          logout()
          return
        }
        throw new Error()
      } catch (err) {
        const responseMessage = err.response?.data?.message
        if (responseMessage === 'Details are incorrect') {
          responseHandler('Details are incorrect', 'warning')
        } else if (responseMessage === 'EMAIL_OR_PASSWORD_WRONG') {
          form.setFields([
            {
              name: 'password',
              errors: ['Incorrect password']
            }
          ])
        } else if (responseMessage === 'Internal server error') {
          responseHandler(new Error(responseMessage), 'error')
        } else {
          responseHandler(err, 'error')
        }
      }
    }, [token, logout, form]
  )

  return (
    <Form
      {...layout}
      form={form}
      name='changePassword'
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Current Password'
        name='password'
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='New Password'
        name='newPassword'
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        label='Confirm Password'
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>

        <Button type='link' onClick={() => props.onChangePassword(false)}>
          Back to User Profile
        </Button>

      </Form.Item>
    </Form>
  )
}

export default ChangePassword
