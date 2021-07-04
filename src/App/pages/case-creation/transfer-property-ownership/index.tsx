import React from 'react'
import { Form, Input } from 'antd'

import MultiStepForm from '../../../components/multi-step-form'

const TransferPropertyOwnershipForm: React.FC = (props) => {
  const Step1Form = () => {
    return (
      <>
        <Form.Item name='field1' label='Field1'>
          <Input />
        </Form.Item>
      </>
    )
  }

  const Step2Form = () => {
    return (
      <>
        <Form.Item name='field2' label='Field2'>
          <Input />
        </Form.Item>
      </>
    )
  }

  const Step3Form = () => {
    return (
      <>
        <Form.Item name='field3' label='Field3'>
          <Input />
        </Form.Item>
      </>
    )
  }

  const steps = [
    {
      title: 'Step1',
      content: <Step1Form />
    },
    {
      title: 'Step2',
      content: <Step2Form />
    },
    {
      title: 'Step3',
      content: <Step3Form />
    }
  ]

  const handleSubmit = (formData: Record<string, any>) => {
    console.log(formData)
  }

  return <MultiStepForm PageHeaderProps={{ title: 'Transfer of Property Ownership' }} steps={steps} onSubmit={handleSubmit} />
}

export default TransferPropertyOwnershipForm
