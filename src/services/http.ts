import axios from 'axios';

export const axiosConnection = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  withCredentials: true,
})

export async function httpRequest(url: string) {
  const { data } = await axiosConnection.get(url)
  return data
}

export async function httpPost<V, T>(url: string, payload?: V): Promise<T> {
  const { data } = await axiosConnection.post(url, payload)
  return data
}

