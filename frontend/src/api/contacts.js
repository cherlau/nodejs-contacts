import client from './client'

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export const contactsApi = {
  getAll: () => client.get('/contacts'),
  getOne: (id) => client.get(`/contacts/${id}`),
  create: (formData) => client.post('/contacts', formData, multipart),
  update: (id, formData) => client.put(`/contacts/${id}`, formData, multipart),
  remove: (id) => client.delete(`/contacts/${id}`),
}
