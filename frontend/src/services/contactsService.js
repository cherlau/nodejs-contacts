import { contactsApi } from '@/api'

export const contactsService = {
  async getAll() {
    const { data } = await contactsApi.getAll()
    return data
  },
  async getOne(id) {
    const { data } = await contactsApi.getOne(id)
    return data
  },
  async create(formData) {
    const { data } = await contactsApi.create(formData)
    return data
  },
  async update(id, formData) {
    const { data } = await contactsApi.update(id, formData)
    return data
  },
  async remove(id) {
    const { data } = await contactsApi.remove(id)
    return data
  },
}
