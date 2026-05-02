<script setup>
import { useContactForm } from '@/composables/useContactForm'

const { form, errors, loading, isEditing, handleFileChange, handleSubmit } = useContactForm()
</script>

<template>
  <div>
    <h1>{{ isEditing ? 'Editar contato' : 'Novo contato' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <input v-model="form.name" type="text" />
        <p v-if="errors.name">{{ errors.name }}</p>
      </div>
      <div>
        <input v-model="form.contact" type="text" />
        <p v-if="errors.contact">{{ errors.contact }}</p>
      </div>
      <div>
        <input v-model="form.email" type="email" />
        <p v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div>
        <input type="file" @change="handleFileChange" />
        <p v-if="errors.picture">{{ errors.picture }}</p>
      </div>
      <p v-if="errors.general">{{ errors.general }}</p>
      <button type="submit" :disabled="loading">Salvar</button>
    </form>
  </div>
</template>
