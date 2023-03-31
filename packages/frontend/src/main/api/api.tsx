import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const createSession = async (email: string, password: string) => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return api.post('/auth', { email, password })
}
