import React, { useState } from 'react'
import { Button, Form, PageHeader, PageHeaderProps, Steps } from 'antd'

interface IStep {
  title: string;
  content: React.ReactNode;
}

interface IMultiStepFormProps {
  onSubmit: (formData: Record<string, any>) => void;
  PageHeaderProps: PageHeaderProps;
  steps: IStep[];
}

const MultiStepForm: React.FC<IMultiStepFormProps> = (props) => {
  const [form] = Form.useForm()
  const [activeStep, setActiveStep] = useState<number>(0)
  const { onSubmit, PageHeaderProps, steps } = props

  // TODO: Trigger form validation on every step

  return (
    <PageHeader {...PageHeaderProps}>
      <Form form={form} onFinish={() => onSubmit(form.getFieldsValue(true))}>
        <Steps current={activeStep}>
          {steps.map(step => <Steps.Step key={step.title} title={step.title} />)}
        </Steps>
        <div style={{ marginTop: 24 }}>
          {steps[activeStep].content}
        </div>
        <div style={{ marginTop: 24 }}>
          {activeStep < steps.length - 1 && (
            <Button type='primary' onClick={() => setActiveStep(prev => prev + 1)}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          )}
          {activeStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => setActiveStep(prev => prev - 1)}>
              Previous
            </Button>
          )}
        </div>
      </Form>
    </PageHeader>
  )
}

export default MultiStepForm
