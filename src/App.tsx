import React from 'react'
import './App.css'

import { AuthContext } from './App/shared/context/auth-context'
import { useAuth } from './App/shared/hooks/auth-hook'
import AppRouter from './App/routes'

const App: React.FC = () => {
  const { login, logout, token, userId, userRole, resetToken } = useAuth()

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
