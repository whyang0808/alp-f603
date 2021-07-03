import React, { useEffect, useState } from 'react'
import './App.css'

import { AuthContext } from './App/shared/context/auth-context'
import { useAuth } from './App/shared/hooks/auth-hook'
import AppRouter from './App/routes'
import { Spin } from 'antd'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { login, logout, token, userId, userRole, resetToken } = useAuth()

  useEffect(() => {
    if (token) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [token])

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        role: userRole,
        token,
        userId,
        login,
        logout,
        resetToken
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
