<script setup>
import { ref } from 'vue'
import { useContactForm } from '@/composables/useContactForm'
import { RouterLink } from 'vue-router'

const { form, errors, loading, isEditing, handleFileChange, handleSubmit } = useContactForm()

const selectedFileName = ref(null)

function onFileChange(event) {
  handleFileChange(event)
  selectedFileName.value = event.target.files[0]?.name ?? null
}
</script>

<template>
  <div class="form-page">
    <!-- Nav -->
    <nav class="form-nav">
      <RouterLink to="/" class="link">← Voltar</RouterLink>
    </nav>

    <!-- Eyebrow -->
    <div class="form-eyebrow">
      <span class="form-eyebrow__label">
        {{ isEditing ? 'Editar contato' : 'Novo contato' }}
      </span>
      <span class="form-eyebrow__rule"></span>
    </div>

    <div class="form-content">
      <div class="form-card">
        <h1 class="form-title">
          {{ isEditing ? 'Editar contato' : 'Novo contato' }}
        </h1>

        <form class="cform" @submit.prevent="handleSubmit" novalidate>

          <!-- Name -->
          <div class="cform__field" :class="{ 'cform__field--error': errors.name }">
            <label class="cform__label" for="f-name">Nome</label>
            <input
              id="f-name"
              v-model="form.name"
              class="cform__input"
              type="text"
              placeholder="Nome completo"
              autocomplete="off"
            />
            <p v-if="errors.name" class="cform__error-msg">{{ errors.name }}</p>
          </div>

          <!-- Phone -->
          <div class="cform__field" :class="{ 'cform__field--error': errors.contact }">
            <label class="cform__label" for="f-contact">Telefone</label>
            <input
              id="f-contact"
              v-model="form.contact"
              class="cform__input"
              type="text"
              placeholder="(11) 99999-9999"
              autocomplete="off"
            />
            <p v-if="errors.contact" class="cform__error-msg">{{ errors.contact }}</p>
          </div>

          <!-- Email -->
          <div class="cform__field" :class="{ 'cform__field--error': errors.email }">
            <label class="cform__label" for="f-email">E-mail</label>
            <input
              id="f-email"
              v-model="form.email"
              class="cform__input"
              type="email"
              placeholder="email@exemplo.com"
              autocomplete="off"
            />
            <p v-if="errors.email" class="cform__error-msg">{{ errors.email }}</p>
          </div>

          <!-- Photo upload -->
          <div class="cform__field" :class="{ 'cform__field--error': errors.picture }">
            <label class="cform__label">Foto</label>
            <label class="cform__upload" :class="{ 'cform__upload--selected': selectedFileName }">
              <span class="cform__upload-icon">{{ selectedFileName ? '✓' : '↑' }}</span>
              <span class="cform__upload-text">
                {{ selectedFileName ?? 'Selecionar imagem…' }}
              </span>
              <input
                type="file"
                class="cform__upload-input"
                accept="image/*"
                @change="onFileChange"
              />
            </label>
            <p v-if="errors.picture" class="cform__error-msg">{{ errors.picture }}</p>
          </div>

          <!-- General error -->
          <p v-if="errors.general" class="cform__general-error">{{ errors.general }}</p>

          <!-- Actions -->
          <div class="cform__actions">
            <RouterLink to="/" class="btn btn--ghost">Cancelar</RouterLink>
            <button type="submit" class="btn btn--primary" :disabled="loading">
              <span v-if="loading">Salvando…</span>
              <span v-else>{{ isEditing ? 'Salvar alterações' : 'Criar contato' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  min-height: 100vh;
  animation: pageFadeIn 0.4s ease;
}

/* NAV */
.form-nav {
  padding: 20px 40px;
  border-bottom: 2px solid var(--border);
}

/* EYEBROW */
.form-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 40px 0;
}

.form-eyebrow__label {
  font-family: var(--font-data);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  white-space: nowrap;
}

.form-eyebrow__rule {
  flex: 1;
  height: 2px;
  background: var(--border);
}

/* CONTENT */
.form-content {
  padding: 28px 40px 80px;
}

.form-card {
  max-width: 560px;
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-lg);
  padding: 40px;
}

.form-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

/* FORM */
.cform {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.cform__field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.cform__label {
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.cform__input {
  font-family: var(--font-ui);
  font-size: 1rem;
  padding: 12px 14px;
  border: 2px solid var(--border);
  background: var(--surface-alt);
  color: var(--text-primary);
  outline: none;
  transition: box-shadow var(--transition), background var(--transition);
  box-shadow: var(--shadow-sm);
}

.cform__input:focus {
  background: #fff;
  box-shadow: 3px 3px 0 var(--accent);
}

.cform__input::placeholder {
  color: var(--text-muted);
}

.cform__field--error .cform__input {
  border-color: var(--accent);
  box-shadow: 2px 2px 0 var(--accent);
}

.cform__error-msg {
  font-family: var(--font-data);
  font-size: 0.78rem;
  color: var(--accent);
}

/* UPLOAD */
.cform__upload {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border: 2px dashed var(--border);
  background: var(--surface-alt);
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition);
  user-select: none;
}

.cform__upload:hover {
  background: #fff;
  border-color: var(--text-secondary);
}

.cform__upload--selected {
  border-style: solid;
  border-color: var(--border);
  background: #fff;
}

.cform__upload-input {
  display: none;
}

.cform__upload-icon {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--bg);
}

.cform__upload--selected .cform__upload-icon {
  color: #fff;
  background: var(--border);
}

.cform__upload-text {
  font-family: var(--font-data);
  font-size: 0.85rem;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cform__upload--selected .cform__upload-text {
  color: var(--text-primary);
  font-weight: 600;
}

/* GENERAL ERROR */
.cform__general-error {
  font-family: var(--font-data);
  font-size: 0.84rem;
  color: var(--accent);
  background: rgba(212, 57, 31, 0.06);
  border: 1px solid rgba(212, 57, 31, 0.28);
  padding: 10px 14px;
}

/* ACTIONS */
.cform__actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 2px solid var(--border);
  margin-top: 4px;
}

.cform__actions .btn:last-child {
  min-width: 160px;
}

.cform__actions .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow);
}

@media (max-width: 640px) {
  .form-nav { padding: 16px 20px; }
  .form-eyebrow { padding: 24px 20px 0; }
  .form-content { padding: 24px 20px 60px; }
  .form-card { padding: 28px 20px; }
  .cform__actions { flex-direction: column-reverse; }
  .cform__actions .btn { width: 100%; }
}
</style>
