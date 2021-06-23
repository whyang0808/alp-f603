import React from 'react'
import { Form, Input, Button } from 'antd'

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
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      {...layout}
      name='changePassword'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='Current Password'
        name='currentPassword'
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='New Password'
        name='Password'
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        label='Confirm Password'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
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
