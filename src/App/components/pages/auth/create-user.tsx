import React from 'react'
import moment from 'moment'
import { Form, DatePicker, Input, Button, Radio } from 'antd'
import { debounce, omit } from 'lodash'

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 12
  }
}

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 12
  }
}

const CreateUser: React.FC = (props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    const updatedValues = {
      ...omit(values, ['firstName', 'lastName']),
      name: { firstName: values.firstName, lastName: values.lastName }

    }
    console.log('Success:', updatedValues)
    // HTTP Request to create user account & check for duplication & wait for admin approval
  }

  const handleValuesChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const idType = form.getFieldValue('idType')

    if (value.length === 12 && idType === 'ic') {
      const birthdate = value.slice(0, 6)
      let year = '19'
      const birthYear = parseFloat(year + value.slice(0, 2))
      const currentYear = new Date().getFullYear()

      if ((currentYear - birthYear) > 99) {
        year = '20'
      }

      const concatenatedBirthDate = year.concat('', birthdate)

      form.setFieldsValue({
        birthDate: moment(concatenatedBirthDate)
      })
    }
  }, 1000)

  return (
    <Form
      {...layout}
      form={form}
      name='create-user-form'
      initialValues={{
        idType: 'ic'
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name='idType'
        label='ID Type'
      >
        <Radio.Group>
          <Radio.Button value='ic'>Identity Card (IC)</Radio.Button>
          <Radio.Button value='passportNo'>Passport</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name='idNumber'
        label='IC/ Passport No'
        tooltip='For IC, do not includes dashes (-)'
        rules={[
          {
            required: true,
            message: 'Please input your identification number!'
          }
        ]}
      >
        <Input
          onChange={handleValuesChange}
        />
      </Form.Item>

      <Form.Item
        name='firstName'
        label='First/Given Name'
        rules={[
          {
            required: true,
            message: 'Please input your first/given name!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='lastName'
        label='Last/Surname Name'
        rules={[
          {
            required: true,
            message: 'Please input your last/surname name!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='email'
        label='E-mail'
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
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='birthDate'
        label='Birth Date'
        rules={[
          {
            type: 'object',
            required: true,
            message: 'Please select date!'
          }
        ]}
      >
        <DatePicker format='YYYY-MM-DD' />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>

    </Form>

  )
}

export default CreateUser
