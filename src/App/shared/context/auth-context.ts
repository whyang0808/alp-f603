import { createContext } from 'react'

export interface IAuthState {
  token: string | undefined;
  tokenExpirationDate: Date | undefined;
  userId: string | undefined;
  userRoles: any;
}

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | undefined;
  token: string | undefined;
  roles: any;
  login: (uid: string,
    roles: any,
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
  roles: undefined,
  login: () => {},
  resetToken: () => {},
  logout: () => {}
})
