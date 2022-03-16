import { IUser } from "../contexts/authContext";
import { axiosConnection, httpPost } from "./http";

export interface IUserPayload {
  email: string
  senha: string
}

async function login(email: string, senha: string): Promise<IUser> {
    const signIn = await httpPost<IUserPayload, IUser>(`/sessao/criar`, ({email, senha}))

    return signIn
}

async function getSession(): Promise<IUser> {
  const session = await axiosConnection.get(`/sessao/usuario`)
  return session.data
}

async function endSession(): Promise<void> {
  return await httpPost<string, void>(`/sessao/finalizar`)
}

export { login, getSession, endSession }