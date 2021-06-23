import React, { useState, useCallback } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'

import Profile from '../../pages/setting/profile'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const SideBar: React.FC = (props) => {
  const [selectedKey, setSelectedKey] = useState<string>('profile')

  let bodyContent: any

  if (selectedKey === 'profile') {
    bodyContent = <Profile />
  } else {
    bodyContent = <div>{selectedKey}</div>
  }

  const handleClick = useCallback<((e: MenuInfo) => void)>(
    (e) => {
      console.log('click ', e.key)
      setSelectedKey(e.key)
    }, [])

  return (
    <>
      <Content>
        <Layout style={{ background: '#fff', minHeight: '90vh' }}>
          <Sider
            width={200}
          >
            <Menu
              mode='inline'
              defaultSelectedKeys={[selectedKey]}
              style={{ height: '100%' }}
              onClick={handleClick}
            >
              <Menu.Item key='profile' icon={<UserOutlined />}>Profile</Menu.Item>

              <SubMenu key='sub1' icon={<LaptopOutlined />} title='Sub Nav'>
                <Menu.Item key='1'>Option 1</Menu.Item>
                <Menu.Item key='2'>Option 2</Menu.Item>
              </SubMenu>

              <Menu.Item key='notification' icon={<NotificationOutlined />}>Notification</Menu.Item>

            </Menu>
          </Sider>
          <Content style={{ padding: '1%' }}>
            {bodyContent}
          </Content>
        </Layout>
      </Content>
    </>

  )
}

export default SideBar
