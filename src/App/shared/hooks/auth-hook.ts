import { useCallback, useEffect, useReducer } from 'react'

import { IAuthState } from '../context/auth-context'

const USER_DATA = 'userData'
let logoutTimer: number

const authInitialState: IAuthState = {
  token: undefined,
  tokenExpirationDate: undefined,
  userId: undefined,
  userRoles: undefined
}

const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case 'login':
      return {
        token: action.payload.token,
        tokenExpirationDate: action.payload.tokenExpirationDate,
        userId: action.payload.userId,
        userRoles: action.payload.userRoles
      }
    case 'resetToken':
      return {
        ...state,
        token: action.payload.token,
        tokenExpirationDate: action.payload.tokenExpirationDate
      }
    case 'logout':
      return {
        ...state,
        ...authInitialState
      }
    default: return authInitialState
  }
}

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  const login = useCallback<(uid: string, roles: any, token: string, expirationDate?: Date) => void>((uid, roles, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 3600000) // Set 1 hour expiration if expiration date is not given
    const accessToken = `Bearer ${token}`

    dispatch({
      type: 'login',
      payload: {
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate,
        userId: uid,
        userRoles: roles
      }
    })

    localStorage.setItem(USER_DATA,
      JSON.stringify({
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate.toISOString(),
        userId: uid,
        userRoles: roles
      }))
  }, [])

  const logout = useCallback(() => {
    dispatch({
      type: 'logout'
    })

    localStorage.removeItem(USER_DATA)
  }, [])

  const resetToken = useCallback<(token: string, expirationDate?: Date) => void>((token, expirationDate) => {
    // Set 1 hour expiration if expiration date is not given
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 3600000)
    const accessToken = `Bearer ${token}`

    dispatch({
      type: 'resetToken',
      payload: {
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate
      }
    })

    localStorage.setItem(USER_DATA,
      JSON.stringify({
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate.toISOString(),
        userId: state.userId,
        userRoles: state.userRoles
      }))
  }, [state.userId, state.userRoles])

  useEffect(() => {
    const storedUserData = localStorage.getItem(USER_DATA)

    if (storedUserData) {
      const { userId, userRoles, token, tokenExpirationDate } = JSON.parse(storedUserData)
      if (new Date(tokenExpirationDate) > new Date()) {
        const accessToken = token.split(' ')[1]
        login(userId, userRoles, accessToken, new Date(tokenExpirationDate))
      }
    }
  }, [login])

  useEffect(() => {
    if (state.token && state.tokenExpirationDate) {
      logoutTimer = window.setTimeout(logout, state.tokenExpirationDate.getTime() - new Date().getTime())
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, state.token, state.tokenExpirationDate])

  return {
    login,
    logout,
    resetToken,
    token: state.token,
    userId: state.userId,
    userRoles: state.userRoles
  }
}
