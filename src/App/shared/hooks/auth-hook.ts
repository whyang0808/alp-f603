import { useCallback, useEffect, useState } from 'react'

import { ROLE } from '../constants'

const USER_DATA = 'userData'
let logoutTimer: number

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState<null | Date>(null)
  const [userId, setUserId] = useState<null | string>(null)
  const [userRole, setUserRole] = useState<ROLE>(ROLE.UNKNOWN)

  const login = useCallback<(uid: string, role: ROLE, token: string, expirationDate: Date) => void>((uid, role, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 3600000) // Set 1 hour expiration if expiration date is not given
    setUserId(uid)
    setUserRole(role)
    setToken(token)
    setTokenExpirationDate(expirationDate || new Date(new Date().getTime() + 3600000))

    localStorage.setItem(USER_DATA, JSON.stringify({ uid, role, token, expiration: tokenExpirationDate.toISOString() }))
  }, [])

  const logout = useCallback(() => {
    setUserId(null)
    setUserRole(ROLE.UNKNOWN)
    setToken(null)
    setTokenExpirationDate(null)

    localStorage.removeItem(USER_DATA)
  }, [])

  useEffect(() => {
    const storedUserData = localStorage.getItem(USER_DATA)

    if (storedUserData) {
      const { uid, role, token, expiration } = JSON.parse(storedUserData)
      if (new Date(expiration) > new Date()) {
        login(uid, role, token, expiration)
      }
    }
  }, [login])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      logoutTimer = window.setTimeout(logout, tokenExpirationDate.getTime() - new Date().getTime())
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, token, tokenExpirationDate])

  return { login, logout, token, userId, userRole }
}
