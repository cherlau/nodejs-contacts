import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { extractErrorMessage } from '@/utils/errorHandler'
import { ROUTES } from '@/constants/routes'

export function useLogin() {
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  async function handleLogin() {
    loading.value = true
    error.value = ''
    try {
      await authService.login(username.value, password.value)
      router.push(ROUTES.HOME)
    } catch (err) {
      error.value = extractErrorMessage(err)
    } finally {
      loading.value = false
    }
  }

  return { username, password, loading, error, handleLogin }
}
