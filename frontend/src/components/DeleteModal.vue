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
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('cancel')">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal__header">
          <span class="modal__icon">!</span>
          <h2 class="modal__title">Excluir contato</h2>
        </div>
        <p class="modal__text">
          Tem certeza que deseja excluir
          <strong>{{ contactName }}</strong>?
          Esta ação não pode ser desfeita.
        </p>
        <div class="modal__actions">
          <button class="btn btn--ghost" @click="emit('cancel')">Cancelar</button>
          <button class="btn btn--danger" @click="emit('confirm')">Excluir</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: 20px;
  backdrop-filter: blur(2px);
}

.modal {
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-xl);
  padding: 36px 32px;
  max-width: 420px;
  width: 100%;
  animation: modalIn 0.2s ease;
}

.modal__header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.modal__icon {
  width: 36px;
  height: 36px;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  border: 2px solid var(--border);
}

.modal__title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
}

.modal__text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 28px;
}

.modal__text strong {
  color: var(--text-primary);
  font-weight: 700;
}

.modal__actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
