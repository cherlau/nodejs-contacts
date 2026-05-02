import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contactsService } from '@/services/contactsService'
import { extractErrorMessage } from '@/utils/errorHandler'
import { ROUTES } from '@/constants/routes'

export function useContactForm() {
  const route = useRoute()
  const router = useRouter()

  const form = ref({ name: '', contact: '', email: '', picture: null })
  const errors = ref({})
  const loading = ref(false)
  const isEditing = computed(() => !!route.params.id)

  onMounted(async () => {
    if (isEditing.value) {
      const data = await contactsService.getOne(route.params.id)
      form.value = { ...data, picture: null }
    }
  })

  function handleFileChange(event) {
    form.value.picture = event.target.files[0]
  }

  async function handleSubmit() {
    loading.value = true
    errors.value = {}
    try {
      const formData = new FormData()
      formData.append('name', form.value.name)
      formData.append('contact', form.value.contact.replace(/^\+55\s?/, ''))
      formData.append('email', form.value.email)
      if (form.value.picture instanceof File) {
        formData.append('picture', form.value.picture)
      }
      if (isEditing.value) {
        await contactsService.update(route.params.id, formData)
      } else {
        await contactsService.create(formData)
      }
      router.push(ROUTES.HOME)
    } catch (err) {
      if (err.response?.data?.errors) {
        errors.value = err.response.data.errors
      } else {
        errors.value.general = extractErrorMessage(err)
      }
    } finally {
      loading.value = false
    }
  }

  return { form, errors, loading, isEditing, handleFileChange, handleSubmit }
}
