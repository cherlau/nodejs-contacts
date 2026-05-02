<script setup>
import { env } from '@/config/env'

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])
</script>

<template>
  <div>
    <img :src="`${env.serverUrl}${contact.picture}`" :alt="contact.name" />
    <p>{{ contact.name }}</p>
    <p>{{ contact.contact }}</p>
    <p>{{ contact.email }}</p>
    <RouterLink :to="`/contacts/${contact.id}`">Ver</RouterLink>
    <RouterLink :to="`/contacts/${contact.id}/edit`">Editar</RouterLink>
    <button @click="emit('delete', contact.id)">Excluir</button>
  </div>
</template>
