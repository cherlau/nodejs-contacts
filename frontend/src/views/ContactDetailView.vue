<script setup>
import { useContactDetail } from '@/composables/useContactDetail'
import { RouterLink } from 'vue-router'
import { env } from '@/config/env'

const { contact, loading, error } = useContactDetail()
</script>

<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <p v-if="loading">Carregando...</p>
    <div v-if="contact">
      <img :src="`${env.serverUrl}${contact.picture}`" :alt="contact.name" />
      <p>{{ contact.name }}</p>
      <p>{{ contact.contact }}</p>
      <p>{{ contact.email }}</p>
      <p>{{ contact.created_at }}</p>
      <RouterLink to="/">Voltar</RouterLink>
      <RouterLink :to="`/contacts/${contact.id}/edit`">Editar</RouterLink>
    </div>
  </div>
</template>
