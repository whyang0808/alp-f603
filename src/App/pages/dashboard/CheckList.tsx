import React from 'react'
import { Collapse, Tabs, Table, Tag, Space } from 'antd'

const { TabPane } = Tabs
const { Panel } = Collapse
const { Column, ColumnGroup } = Table

const CheckList: React.FC = (props) => {
  const text = 'Testing'
  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]

  return (
    <Tabs defaultActiveKey='1' type='card'>
      <TabPane tab='Card Tab 1' key='1'>
        <Collapse accordion>
          <Panel header='This is panel header 1' key='1'>
            <Table dataSource={data}>
              <ColumnGroup title='Name'>
                <Column title='First Name' dataIndex='firstName' key='firstName' />
                <Column title='Last Name' dataIndex='lastName' key='lastName' />
              </ColumnGroup>
              <Column title='Age' dataIndex='age' key='age' />
              <Column title='Address' dataIndex='address' key='address' />
              <Column
                title='Tags'
                dataIndex='tags'
                key='tags'
                render={tags => (
                  <>
                    {tags.map((tag: any) => (
                      <Tag color='blue' key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </>
                )}
              />
              <Column
                title='Action'
                key='action'
                render={(text, record: any) => (
                  <Space size='middle'>
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                  </Space>
                )}
              />
            </Table>
          </Panel>
          <Panel header='This is panel header 2' key='2'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 3' key='3'>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </TabPane>
      <TabPane tab='Card Tab 2' key='2'>
        <Collapse accordion>
          <Panel header='This is panel header 4' key='1'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 5' key='2'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 6' key='3'>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </TabPane>
      <TabPane tab='Card Tab 3' key='3'>
        <Collapse accordion>
          <Panel header='This is panel header 7' key='1'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 8' key='2'>
            <p>{text}</p>
          </Panel>
          <Panel header='This is panel header 9' key='3'>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  )
}

export default CheckList
