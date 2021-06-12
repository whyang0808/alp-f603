import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AuthContext } from './App/shared/context/auth-context'
import { useAuth } from './App/shared/hooks/auth-hook'
import Signup from './App/components/pages/auth/signup'
import Login from './App/components/pages/auth/login'
import DashBoardPage from './App/pages/dashboard'
import SettingPage from './App/pages/setting'

const App: React.FC = () => {
  const { login, logout, token, userId, userRole } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        role: userRole,
        token,
        userId
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/setting'>
            <SettingPage text='Setting' />
          </Route>

          <Route path='/'>
            <DashBoardPage text='Dashboard' />
          </Route>

        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
