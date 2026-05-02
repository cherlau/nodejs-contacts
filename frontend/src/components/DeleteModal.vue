<script setup>
defineProps({
  contactName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div>
    <p>Tem certeza que deseja excluir o contato {{ contactName }}?</p>
    <button @click="emit('confirm')">Confirmar</button>
    <button @click="emit('cancel')">Cancelar</button>
  </div>
</template>
