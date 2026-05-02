import { authApi } from '@/api'
import { useAuthStore } from '@/stores/useAuthStore'

export const authService = {
  async login(username, password) {
    const { data } = await authApi.login({ username, password })
    useAuthStore().setToken(data.token)
    return data
  },
  logout() {
    useAuthStore().clear()
  },
}
