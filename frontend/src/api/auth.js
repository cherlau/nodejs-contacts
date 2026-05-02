import client from './client'

export const authApi = {
  login: (payload) => client.post('/auth/login', payload),
}
