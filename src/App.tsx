import React from 'react'
import './App.css'

import { AuthContext } from './App/shared/context/auth-context'
import { useAuth } from './App/shared/hooks/auth-hook'
import AppRouter from './App/routes'

const App: React.FC = () => {
  const { login, logout, token, userId, userRole } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        role: userRole,
        token,
        userId
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
