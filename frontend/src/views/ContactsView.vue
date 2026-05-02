<script setup>
import { ref } from 'vue'
import { useContacts } from '@/composables/useContacts'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import ContactCard from '@/components/ContactCard.vue'
import DeleteModal from '@/components/DeleteModal.vue'

const { contacts, loading, error, deleteContact } = useContacts()
const authStore = useAuthStore()
const router = useRouter()
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

function handleLogout() {
  authStore.clear()
  router.push('/login')
}
</script>

<template>
  <div class="contacts-page">
    <!-- Header -->
    <header class="contacts-header">
      <span class="contacts-header__logo">
        CONTACTS<span class="contacts-header__dot">.</span>
      </span>
      <div class="contacts-header__actions">
        <button
          v-if="authStore.isAuthenticated"
          class="btn btn--ghost btn--sm"
          @click="handleLogout"
        >
          Sair
        </button>
        <RouterLink v-else to="/login" class="btn btn--ghost btn--sm">
          Entrar
        </RouterLink>
      </div>
    </header>

    <!-- Title bar -->
    <div class="contacts-titlebar">
      <div class="contacts-titlebar__left">
        <h1 class="contacts-titlebar__title">Diretório</h1>
        <span v-if="!loading" class="contacts-titlebar__count">
          {{ contacts.length }} {{ contacts.length === 1 ? 'contato' : 'contatos' }}
        </span>
      </div>
      <RouterLink v-if="authStore.isAuthenticated" to="/contacts/new" class="btn btn--primary">
        + Novo contato
      </RouterLink>
    </div>

    <div class="contacts-divider"></div>

    <p v-if="error" class="state-msg state-msg--error contacts-error">{{ error }}</p>
    <p v-if="loading" class="state-msg contacts-error">Carregando…</p>

    <!-- Empty state -->
    <div v-if="!loading && contacts.length === 0 && !error" class="contacts-empty">
      <span class="contacts-empty__symbol">○</span>
      <p class="contacts-empty__text">Nenhum contato ainda.</p>
      <RouterLink to="/contacts/new" class="btn btn--primary">
        + Adicionar primeiro contato
      </RouterLink>
    </div>

    <!-- Card grid -->
    <div v-if="contacts.length > 0" class="contacts-grid">
      <ContactCard
        v-for="(contact, i) in contacts"
        :key="contact.id"
        :contact="contact"
        :style="{ '--delay': `${i * 55}ms` }"
        @delete="openDeleteModal(contact)"
      />
    </div>

    <DeleteModal
      v-if="selectedContact"
      :contactName="selectedContact.name"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<style scoped>
.contacts-page {
  min-height: 100vh;
  padding-bottom: 80px;
  animation: pageFadeIn 0.4s ease;
}

/* HEADER */
.contacts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 2px solid var(--border);
  background: var(--bg);
  background-image: radial-gradient(circle, rgba(28, 28, 28, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.contacts-header__logo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.contacts-header__dot {
  color: var(--accent);
}

.contacts-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* TITLE BAR */
.contacts-titlebar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 32px 40px 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.contacts-titlebar__left {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}

.contacts-titlebar__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.contacts-titlebar__count {
  font-family: var(--font-data);
  font-size: 0.76rem;
  color: var(--text-muted);
  padding: 3px 10px;
  border: 1px solid var(--text-muted);
}

/* DIVIDER */
.contacts-divider {
  height: 2px;
  background: var(--border);
  margin: 0 40px 32px;
}

.contacts-error {
  padding: 0 40px;
}

/* GRID */
.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 0 40px;
}

/* EMPTY STATE */
.contacts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 80px 40px;
}

.contacts-empty__symbol {
  font-size: 3rem;
  color: var(--text-muted);
  font-family: var(--font-display);
  line-height: 1;
}

.contacts-empty__text {
  font-family: var(--font-data);
  font-size: 0.92rem;
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .contacts-header { padding: 14px 20px; }
  .contacts-titlebar { padding: 24px 20px 16px; }
  .contacts-divider { margin: 0 20px 24px; }
  .contacts-grid { padding: 0 20px; gap: 14px; }
  .contacts-error { padding: 0 20px; }
}
</style>
