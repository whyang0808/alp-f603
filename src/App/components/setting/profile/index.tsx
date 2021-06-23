import React from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd'

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
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

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
      name='basic'
      initialValues={{
        idType: 'ic'
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
