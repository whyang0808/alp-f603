import { createContext } from 'react'
import { ROLE } from '../constants'

type AuthContextType = {
  isLoggedIn: boolean;
  userId: null | string;
  token: null| string;
  role: ROLE;
  login:(uid: string, role: ROLE, token: string, expirationDate: Date) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  token: null,
  role: ROLE.UNKNOWN,
  login: () => {},
  logout: () => {}
})
