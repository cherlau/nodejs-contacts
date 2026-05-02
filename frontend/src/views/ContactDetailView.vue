<script setup>
import { useContactDetail } from '@/composables/useContactDetail'
import { RouterLink } from 'vue-router'
import { env } from '@/config/env'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const { contact, loading, error } = useContactDetail()

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}
</script>

<template>
  <div class="detail-page">
    <!-- Nav -->
    <nav class="detail-nav">
      <RouterLink to="/" class="link">← Voltar</RouterLink>
    </nav>

    <p v-if="loading" class="state-msg detail-state">Carregando…</p>
    <p v-if="error" class="state-msg state-msg--error detail-state">{{ error }}</p>

    <template v-if="contact">
      <div class="detail-eyebrow">
        <span class="detail-eyebrow__label">Contato</span>
        <span class="detail-eyebrow__rule"></span>
        <RouterLink v-if="authStore.isAuthenticated" :to="`/contacts/${contact.id}/edit`" class="btn btn--primary btn--sm">
          Editar
        </RouterLink>
      </div>

      <div class="detail-content">
        <div class="detail-card">
          <!-- Photo -->
          <div class="detail-photo-wrap">
            <img
              v-if="contact.picture"
              :src="`${env.serverUrl}${contact.picture}`"
              :alt="contact.name"
              class="detail-photo"
            />
            <div v-else class="detail-initials">
              {{ getInitials(contact.name) }}
            </div>
          </div>

          <!-- Info -->
          <div class="detail-info">
            <h1 class="detail-name">{{ contact.name }}</h1>

            <dl class="detail-fields">
              <div v-if="contact.contact" class="detail-field">
                <dt class="detail-field__label">Telefone</dt>
                <dd class="detail-field__value">{{ contact.contact }}</dd>
              </div>
              <div v-if="contact.email" class="detail-field">
                <dt class="detail-field__label">E-mail</dt>
                <dd class="detail-field__value detail-field__value--email">{{ contact.email }}</dd>
              </div>
              <div v-if="contact.created_at" class="detail-field">
                <dt class="detail-field__label">Cadastrado</dt>
                <dd class="detail-field__value">{{ formatDate(contact.created_at) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  animation: pageFadeIn 0.4s ease;
}

/* NAV */
.detail-nav {
  padding: 20px 40px;
  border-bottom: 2px solid var(--border);
}

.detail-state {
  padding: 20px 40px;
}

/* EYEBROW */
.detail-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 40px 0;
}

.detail-eyebrow__label {
  font-family: var(--font-data);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  white-space: nowrap;
}

.detail-eyebrow__rule {
  flex: 1;
  height: 2px;
  background: var(--border);
}

/* CONTENT */
.detail-content {
  padding: 28px 40px 80px;
}

.detail-card {
  display: flex;
  gap: 48px;
  align-items: flex-start;
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-lg);
  padding: 40px;
}

/* PHOTO */
.detail-photo-wrap {
  width: 220px;
  height: 220px;
  flex-shrink: 0;
  border: 2px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.detail-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-muted);
  background: repeating-linear-gradient(
    45deg,
    var(--surface-alt) 0,
    var(--surface-alt) 4px,
    var(--bg) 4px,
    var(--bg) 8px
  );
}

/* INFO */
.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.detail-name {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* FIELDS */
.detail-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 2px solid var(--border);
  padding-top: 22px;
}

.detail-field {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.detail-field__label {
  font-family: var(--font-data);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: var(--text-muted);
  width: 100px;
  flex-shrink: 0;
}

.detail-field__value {
  font-family: var(--font-data);
  font-size: 0.95rem;
  color: var(--text-primary);
}

.detail-field__value--email {
  color: var(--link-color);
}

@media (max-width: 700px) {
  .detail-nav { padding: 16px 20px; }
  .detail-eyebrow { padding: 24px 20px 0; }
  .detail-content { padding: 24px 20px 60px; }
  .detail-card { flex-direction: column; gap: 28px; padding: 28px 24px; }
  .detail-photo-wrap { width: 100%; height: auto; aspect-ratio: 1; }
  .detail-field { flex-direction: column; gap: 4px; }
  .detail-field__label { width: auto; }
}
</style>
