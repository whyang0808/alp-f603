import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import { Form, DatePicker, Input, Button, Radio, message } from 'antd'
import { debounce } from 'lodash'

import axios from '../../shared/axios/axios'
import responseHandler from '../../utils/respHandler'
import { SubmitValues } from './interfaces'

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

const Signup: React.FC = (props) => {
  const [form] = Form.useForm()
  const history = useHistory()

  const handleSubmit = async (values: SubmitValues) => {
    const modifiedValues = {
      ...values,
      birthDate: values.birthDate!.format('YYYY-MM-DD')
    }
    try {
      const { status } = await axios.post('/user/create', modifiedValues)
      if (status === 200) {
        // why needed message.destroy()?
        message.destroy()
        history.push('/login')
        return responseHandler('Your account has been created, please login', 'success')
      }
      throw new Error()
    } catch (err) {
      const responseMessage = err.response?.data?.message
      if (responseMessage === 'USER_EXISTS') {
        responseHandler('User exists already, please login instead', 'warning')
      } else if (responseMessage === 'Internal server error') {
        responseHandler(new Error(responseMessage), 'error')
      } else {
        responseHandler(err, 'error')
      }
    }
  }

  const handleValuesChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const idType = form.getFieldValue('idType') as string

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
    <div style={{ padding: '2% 2%' }}>
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

          <div style={{ paddingTop: '2%' }}>
            Already have an account? <Link to='/login'>Return to login</Link>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Signup
