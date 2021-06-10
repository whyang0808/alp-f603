import React from 'react'
import NavBar from '../../components/layouts/NavBar'

interface SettingProps {
    text?: string;
}

const Setting: React.FC<SettingProps> = (props) => {
  return (
    <NavBar>
      {props.text || 'Setting Page'}
    </NavBar>
  )
}

export default Setting
