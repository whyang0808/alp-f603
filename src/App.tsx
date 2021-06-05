import React from 'react'
import './App.css'
import NavBar from './App/components/layouts/NavBar'
import CreateUser from './App/components/pages/auth/create-user'

const App: React.FC = () => {
  return (
    <NavBar>
      <CreateUser />
    </NavBar>
  )
}

export default App
