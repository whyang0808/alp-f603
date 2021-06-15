import React, { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import NavBar from '../../components/layouts/NavBar'

interface DashBoardProps {
    text?: string;
}

const DashBoard: React.FC<DashBoardProps> = (props) => {
  // const context = useContext(AuthContext)

  return (
    <NavBar>
      {props.text || 'Home Page'}
    </NavBar>
  )
}

export default DashBoard
