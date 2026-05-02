<script setup>
import { ref } from 'vue'
import { useContacts } from '@/composables/useContacts'
import ContactCard from '@/components/ContactCard.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import { RouterLink } from 'vue-router'

const { contacts, loading, error, deleteContact } = useContacts()

const selectedContact = ref(null)

function openDeleteModal(contact) {
  selectedContact.value = contact
}

async function handleConfirmDelete() {
  await deleteContact(selectedContact.value.id)
  selectedContact.value = null
}

function handleCancelDelete() {
  selectedContact.value = null
}
</script>

<template>
  <div>
    <RouterLink to="/contacts/new">Novo contato</RouterLink>
    <p v-if="error">{{ error }}</p>
    <p v-if="loading">Carregando...</p>
    <ContactCard
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
      @delete="openDeleteModal(contact)"
    />
    <DeleteModal
      v-if="selectedContact"
      :contactName="selectedContact.name"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>
