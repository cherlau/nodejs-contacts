<script setup>
import { useLogin } from '@/composables/useLogin'

const { username, password, loading, error, handleLogin } = useLogin()
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="username" type="text" />
    <input v-model="password" type="password" />
    <p v-if="error">{{ error }}</p>
    <button type="submit" :disabled="loading">Entrar</button>
  </form>
</template>
