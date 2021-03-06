import React, { useState, useEffect, useCallback } from 'react'
import { DashboardOutlined, UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import logo from './logo.svg'

const { Header, Content } = Layout

const { SubMenu } = Menu

export interface NavBarProps {
  children?: React.ReactNode
}

const NavBar = React.memo<NavBarProps>((props) => {
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState('home')

  useEffect(() => {
    const paths = pathname.split('/')
    const key = paths[1] ? paths[1] : 'home'

    setSelectedKey(key)
  }, [pathname])

  const handleLogout = useCallback(() => {

  }, [])

  return (
    <>
      <Header style={{ display: 'flex', justifyContent: 'space-between', padding: '0 25px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              style={{
                float: 'left',
                width: '50px',
                height: '35px'

              }}
            />
          </Link>
        </div>
        <Menu theme='dark' selectedKeys={[selectedKey]} mode='horizontal' style={{ display: 'flex' }}>
          <Menu.Item key='home' icon={<DashboardOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <SubMenu key='account' icon={<UserOutlined />} title='Account'>
            <Menu.Item key='setting' icon={<SettingOutlined />}>
              <Link to='/setting'>Setting</Link>
            </Menu.Item>
            <Menu.Item key='logout' icon={<LoginOutlined />} onClick={() => handleLogout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '2% 2%' }}>
        {props.children}
      </Content>
    </>
  )
})

export default NavBar
