import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './route'
import SignupPage from '../pages/auth/signup'
import LoginPage from '../pages/auth/login'
import ForgotPage from '../pages/auth/forgot'
import ResetPage from '../pages/auth/reset'
import SettingPage from '../pages/setting'
import DashBoardPage from '../pages/dashboard'

import withAxios from '../shared/axios/withAxios'
import AxiosInstance from '../shared/axios/axios'

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path='/signup'>
        <SignupPage />
      </PublicRoute>

      <PublicRoute path='/login'>
        <LoginPage />
      </PublicRoute>

      <PublicRoute path='/forgot'>
        <ForgotPage />
      </PublicRoute>

      <PublicRoute path='/reset-password'>
        <ResetPage />
      </PublicRoute>

      <PrivateRoute path='/setting'>
        <SettingPage text='Setting' />
      </PrivateRoute>

      <PrivateRoute path='/'>
        <DashBoardPage />
      </PrivateRoute>

    </Switch>
  </BrowserRouter>
)

export default withAxios(AppRouter, AxiosInstance)
