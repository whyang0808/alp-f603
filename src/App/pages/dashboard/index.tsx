import React from 'react'
import NavBar from '../../components/layouts/NavBar'

interface DashBoardProps {
    text?: string;
}

const DashBoard: React.FC<DashBoardProps> = (props) => {
  return (
    <NavBar>
      {props.text || 'Home Page'}
    </NavBar>
  )
}

export default DashBoard
