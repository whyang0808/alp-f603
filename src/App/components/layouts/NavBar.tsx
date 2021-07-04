import React, { useState, useEffect, useContext, useMemo } from 'react'
import { DashboardOutlined, UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Select } from 'antd'

import { AuthContext } from '../../shared/context/auth-context'
import logo from './logo.svg'

const { Header } = Layout
const { Option } = Select

const { SubMenu } = Menu

export interface NavBarProps {
  children?: React.ReactNode
}

const NavBar = React.memo<NavBarProps>((props) => {
  const { roles, logout } = useContext(AuthContext)
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState('home')

  useEffect(() => {
    const paths = pathname.split('/')
    const key = paths[1] ? paths[1] : 'home'

    setSelectedKey(key)
  }, [pathname])

  const companies = useMemo(() => {
    return roles.map((r: {company: {_id: string, name: string}}) => {
      return { id: r.company._id, name: r.company.name }
    })
  }, [roles])

  return (
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
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select style={{ width: 200, display: 'flex', alignItems: 'center', marginRight: '5%' }}>
          {
              companies.map((c: any) => (
                <Option key={c.id} value={c.name}>{c.name}</Option>
              ))
            }
        </Select>
        <Menu theme='dark' selectedKeys={[selectedKey]} mode='horizontal' style={{ display: 'flex' }}>
          <Menu.Item key='home' icon={<DashboardOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <SubMenu key='account' icon={<UserOutlined />} title='Account'>
            <Menu.Item key='setting' icon={<SettingOutlined />}>
              <Link to='/setting'>Setting</Link>
            </Menu.Item>
            <Menu.Item key='logout' icon={<LoginOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </span>
    </Header>
  )
})

export default NavBar
