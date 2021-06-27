import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import axios from '../../shared/axios/axios'
import { useQuery } from '../../shared/hooks/query-hook'
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

const ResetPassword = () => {
  const [form] = Form.useForm()
  const { search, searchQuery } = useQuery()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`/user/verify-hashed-reset-password-token${search}`)
        if (result.status === 200) {
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        setError(true)
      }
    }
    )()
  }, [search])

  const handleSubmit = async (values: SubmitValues) => {
    const { newPassword } = values
    try {
      const { status } = await axios.post('/user/reset-password', { ...searchQuery, newPassword })
      if (status === 200) {
        responseHandler('Your password has been reset successfully!', 'success')
        return history.push('/login')
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage === 'Details are incorrect' || responseMessage === 'Unauthorized') {
        responseHandler(new Error('Password reset failed, please request another reset link'), 'error')
      } else if (responseMessage) {
        responseHandler(new Error(responseMessage), 'error')
      } else {
        responseHandler(err, 'error')
      }
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size='large' />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        Sorry, your reset password link is no longer valid. You can request another one here.
        <div style={{ paddingTop: '2%' }}>
          <Button type='primary' onClick={() => history.push('/forgot')}>
            Request Recovery Link
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        form={form}
        style={{ width: '100%' }}
        name='reset-password-form'
        onFinish={handleSubmit}
      >
        <Form.Item {...layout}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            RESET PASSWORD
          </div>
        </Form.Item>

        <Form.Item
          name='newPassword'
          {...layout}
          rules={[
            {
              required: true,
              message: 'Please input your new password!'
            }
          ]}
        >
          <Input.Password placeholder='New password' />
        </Form.Item>

        <Form.Item
          name='confirmNewPassword'
          {...layout}
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!'
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
          <Input.Password placeholder='Confirm new password' />
        </Form.Item>

        <Form.Item {...layout}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Reset Password
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

export default ResetPassword
