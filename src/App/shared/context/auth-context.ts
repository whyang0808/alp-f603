import { createContext } from 'react'
import { ROLE } from '../constants'

export interface IAuthState {
  token: string | undefined;
  tokenExpirationDate: Date | undefined;
  userId: string | undefined;
  userRole: ROLE;
}

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | undefined;
  token: string | undefined;
  role: ROLE;
  login: (uid: string,
    role: ROLE,
    token: string,
    expirationDate?: Date) => void;
  resetToken: (token: string,
    expirationDate?: Date) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: undefined,
  token: undefined,
  role: ROLE.UNKNOWN,
  login: () => {},
  resetToken: () => {},
  logout: () => {}
})
