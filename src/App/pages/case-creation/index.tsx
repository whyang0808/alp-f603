import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, PageHeader, Radio, Space } from 'antd'

import { CASE_CREATION_OPTIONS } from './constants'

const CaseCreation: React.FC = (props) => {
  const [choice, setChoice] = useState<string>(CASE_CREATION_OPTIONS[0].value)
  const history = useHistory()

  return (
    <PageHeader title='Stamping'>
      <Radio.Group onChange={e => setChoice(e.target.value)} value={choice}>
        <Space direction='vertical'>
          {CASE_CREATION_OPTIONS.map(({ label, value }) => <Radio key={value} value={value}>{label}</Radio>)}
        </Space>
      </Radio.Group>
      <div style={{ marginTop: 24 }}>
        <Button type='primary' onClick={() => history.push(`/case/create/${choice}`)}>
          Create
        </Button>
      </div>
    </PageHeader>
  )
}

export default CaseCreation
