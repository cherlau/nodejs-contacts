import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { contactsService } from '@/services/contactsService'
import { extractErrorMessage } from '@/utils/errorHandler'

export function useContactDetail() {
  const route = useRoute()
  const id = route.params.id
  const contact = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function fetchContact() {
    loading.value = true
    error.value = ''
    try {
      contact.value = await contactsService.getOne(id)
    } catch (err) {
      error.value = extractErrorMessage(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchContact)

  return { contact, loading, error }
}
