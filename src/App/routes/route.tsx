import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { AuthContext } from '../shared/context/auth-context'

interface IRouteProps extends RouteProps {
}

export const PrivateRoute : React.FC<IRouteProps> = (props) => {
  const { isLoggedIn } = useContext(AuthContext)

  const { children, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn
          ? children
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
            />
      }}
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
