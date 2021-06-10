import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './App/components/pages/auth/signup'
import Login from './App/components/pages/auth/login'
import DashBoardPage from './App/pages/dashboard'
import SettingPage from './App/pages/setting'

const App: React.FC = () => {
  return (
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
  )
}

export default App
