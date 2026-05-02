import { ref, onMounted } from 'vue'
import { contactsService } from '@/services/contactsService'
import { extractErrorMessage } from '@/utils/errorHandler'

export function useContacts() {
  const contacts = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchContacts() {
    loading.value = true
    error.value = ''
    try {
      contacts.value = await contactsService.getAll()
    } catch (err) {
      error.value = extractErrorMessage(err)
    } finally {
      loading.value = false
    }
  }

  async function deleteContact(id) {
    try {
      await contactsService.remove(id)
      await fetchContacts()
    } catch (err) {
      error.value = extractErrorMessage(err)
    }
  }

  onMounted(fetchContacts)

  return { contacts, loading, error, deleteContact }
}
