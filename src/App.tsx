import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CreateUser from './App/components/pages/auth/create-user'
import DashBoardPage from './App/pages/dashboard'
import SettingPage from './App/pages/setting'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          <CreateUser />
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
