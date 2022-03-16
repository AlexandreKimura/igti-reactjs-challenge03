import { createContext, useContext } from 'react'

export interface IUser {
  email: string,
  nome: string
}

export interface IAuthContext {
  user: IUser
  onSignOut: () => void
}

export const authContext = createContext<IAuthContext>({
  user: {
    nome: "",
    email: ""
  },
  onSignOut: () => {}
})

export function useAuthContext() {
  return useContext(authContext)
}