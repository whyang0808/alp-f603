import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import NavBar from '../components/layouts/NavBar'
import { AuthContext } from '../shared/context/auth-context'

interface IRouteProps extends RouteProps {
}

export const PrivateRoute : React.FC<IRouteProps> = (props) => {
  const { isLoggedIn } = useContext(AuthContext)
  const { children, ...rest } = props

  const renderComponent = (routerProps: RouteProps) => isLoggedIn ? <><NavBar />{children}</> : <Redirect to={{ pathname: '/login', state: { from: routerProps.location } }} />

  return (
    <Route
      {...rest}
      render={renderComponent}
    />
  )
}

export const PublicRoute : React.FC<IRouteProps> = (props) => {
  const { children, ...rest } = props

  return (
    <Route {...rest}>
      {children}
    </Route>
  )
}
