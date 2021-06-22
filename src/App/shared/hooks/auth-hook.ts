import React, { useCallback, useEffect, useReducer } from 'react'

import { ROLE } from '../constants'
import { IAuthState } from '../context/auth-context'

const USER_DATA = 'userData'
let logoutTimer: number

const authInitialState: IAuthState = {
  token: undefined,
  tokenExpirationDate: undefined,
  userId: undefined,
  userRole: ROLE.UNKNOWN
}

const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case 'login':
      return {
        token: action.payload.token,
        tokenExpirationDate: action.payload.tokenExpirationDate,
        userId: action.payload.userId,
        userRole: action.payload.userRole
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

  const login = useCallback<(uid: string, role: ROLE, token: string, expirationDate?: Date) => void>((uid, role, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 3600000) // Set 1 hour expiration if expiration date is not given
    const accessToken = `Bearer ${token}`

    dispatch({
      type: 'login',
      payload: {
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate,
        userId: uid,
        userRole: role
      }
    })

    localStorage.setItem(USER_DATA,
      JSON.stringify({
        token: accessToken,
        tokenExpirationDate: tokenExpirationDate.toISOString(),
        userId: uid,
        userRole: role
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
        userRole: state.userRole
      }))
  }, [state.userId, state.userRole])

  useEffect(() => {
    const storedUserData = localStorage.getItem(USER_DATA)

    if (storedUserData) {
      const { userId, userRole, token, tokenExpirationDate } = JSON.parse(storedUserData)
      if (new Date(tokenExpirationDate) > new Date()) {
        const accessToken = token.split(' ')[1]
        login(userId, userRole, accessToken, new Date(tokenExpirationDate))
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
    userRole: state.userRole
  }
}
