<script setup>
import { env } from '@/config/env'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <article class="contact-card">
    <!-- Photo / Initials -->
    <div class="contact-card__photo-wrap">
      <img
        v-if="contact.picture"
        :src="`${env.serverUrl}${contact.picture}`"
        :alt="contact.name"
        class="contact-card__photo"
      />
      <div v-else class="contact-card__initials">
        {{ getInitials(contact.name) }}
      </div>
    </div>

    <!-- Info -->
    <div class="contact-card__body">
      <h3 class="contact-card__name">{{ contact.name }}</h3>
      <div class="contact-card__data">
        <div v-if="contact.contact" class="contact-card__row">
          <span class="contact-card__icon">↗</span>
          <span class="contact-card__value">{{ contact.contact }}</span>
        </div>
        <div v-if="contact.email" class="contact-card__row">
          <span class="contact-card__icon">@</span>
          <span class="contact-card__value contact-card__value--email">{{ contact.email }}</span>
        </div>
      </div>
    </div>

    <!-- Footer actions (authenticated only) -->
    <div v-if="authStore.isAuthenticated" class="contact-card__footer">
      <RouterLink :to="`/contacts/${contact.id}`" class="btn btn--ghost btn--sm contact-card__btn-ver">
        Ver
      </RouterLink>
      <RouterLink :to="`/contacts/${contact.id}/edit`" class="btn btn--sm contact-card__btn-edit">
        Editar
      </RouterLink>
      <button class="btn btn--danger btn--sm" @click="emit('delete', contact.id)" title="Excluir">
        ✕
      </button>
    </div>
  </article>
</template>

<style scoped>
.contact-card {
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  animation: cardReveal 0.45s ease var(--delay, 0ms) both;
  transition: transform var(--transition), box-shadow var(--transition);
}

.contact-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-xl);
}

/* PHOTO */
.contact-card__photo-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-bottom: 2px solid var(--border);
  background: var(--surface-alt);
  flex-shrink: 0;
}

.contact-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.contact-card:hover .contact-card__photo {
  transform: scale(1.03);
}

.contact-card__initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2.8rem;
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

/* BODY */
.contact-card__body {
  padding: 18px 20px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-card__name {
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-primary);
}

.contact-card__data {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact-card__row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-data);
  font-size: 0.77rem;
  color: var(--text-secondary);
}

.contact-card__icon {
  color: var(--text-muted);
  font-size: 0.72rem;
  width: 14px;
  flex-shrink: 0;
  text-align: center;
}

.contact-card__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-card__value--email {
  color: var(--link-color);
}

/* FOOTER */
.contact-card__footer {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-top: 2px solid var(--border);
  background: var(--surface-alt);
}

.contact-card__btn-ver {
  flex: 1;
}

.contact-card__btn-edit {
  flex: 1;
}
</style>
