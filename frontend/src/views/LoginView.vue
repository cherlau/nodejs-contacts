<script setup>
import { useLogin } from '@/composables/useLogin'
import { useRouter } from 'vue-router'

const { username, password, loading, error, handleLogin } = useLogin()
const router = useRouter()

function enterAsGuest() {
  sessionStorage.setItem('guest', 'true')
  router.push('/')
}
</script>

<template>
  <div class="login-wrap">
    <aside class="login-left">
      <div class="login-left__inner">
        <span class="login-left__badge">Sistema de Contatos</span>
        <h1 class="login-left__title">
          CONTACTS<span class="login-left__dot">.</span>
        </h1>
        <p class="login-left__sub">Diretório pessoal<br />de contatos</p>
        <div class="login-left__lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </aside>

    <main class="login-right">
      <div class="login-card">
        <div class="login-card__header">
          <span class="login-card__eyebrow">Acesso ao sistema</span>
          <h2 class="login-card__title">Entrar</h2>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="login-form__field">
            <label class="login-form__label" for="username">Usuário</label>
            <input
              id="username"
              v-model="username"
              class="login-form__input"
              type="text"
              autocomplete="username"
              placeholder="seu usuário"
            />
          </div>

          <div class="login-form__field">
            <label class="login-form__label" for="password">Senha</label>
            <input
              id="password"
              v-model="password"
              class="login-form__input"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <p v-if="error" class="login-form__error">{{ error }}</p>

          <button
            type="submit"
            class="btn btn--primary login-form__submit"
            :disabled="loading"
          >
            <span v-if="loading">Entrando…</span>
            <span v-else>Entrar →</span>
          </button>

          <div class="login-form__divider">
            <span>ou</span>
          </div>

          <button type="button" class="btn btn--ghost login-form__guest" @click="enterAsGuest">
            Continuar como visitante
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.login-wrap {
  display: flex;
  min-height: 100vh;
}

/* ─── LEFT PANEL ─── */
.login-left {
  width: 40%;
  min-width: 300px;
  background: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.login-left__inner {
  position: relative;
  z-index: 1;
}

.login-left__badge {
  font-family: var(--font-data);
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.38);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  display: inline-block;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 22px;
}

.login-left__title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5vw, 5.2rem);
  font-weight: 700;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.02em;
  animation: slideIn 0.6s ease forwards;
}

.login-left__dot {
  color: var(--accent);
}

.login-left__sub {
  font-family: var(--font-data);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.8;
  margin-top: 20px;
}

.login-left__lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 44px;
}

.login-left__lines span {
  display: block;
  height: 2px;
  background: rgba(255, 255, 255, 0.13);
}

.login-left__lines span:nth-child(1) { width: 64px; }
.login-left__lines span:nth-child(2) { width: 40px; background: var(--accent); opacity: 0.65; }
.login-left__lines span:nth-child(3) { width: 88px; }

/* ─── RIGHT PANEL ─── */
.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow-xl);
  padding: 40px 36px;
  animation: pageFadeIn 0.5s ease 0.15s both;
}

.login-card__header {
  margin-bottom: 32px;
}

.login-card__eyebrow {
  display: block;
  font-family: var(--font-data);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.login-card__title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* ─── FORM ─── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form__field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.login-form__label {
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.login-form__input {
  font-family: var(--font-ui);
  font-size: 1rem;
  padding: 12px 14px;
  border: 2px solid var(--border);
  background: var(--surface-alt);
  color: var(--text-primary);
  outline: none;
  transition:
    box-shadow var(--transition),
    background var(--transition);
  box-shadow: var(--shadow-sm);
}

.login-form__input:focus {
  background: #fff;
  box-shadow: 3px 3px 0 var(--accent);
}

.login-form__input::placeholder {
  color: var(--text-muted);
}

.login-form__error {
  font-family: var(--font-data);
  font-size: 0.82rem;
  color: var(--accent);
  background: rgba(212, 57, 31, 0.06);
  border: 1px solid rgba(212, 57, 31, 0.28);
  padding: 10px 12px;
}

.login-form__submit {
  width: 100%;
  padding: 14px;
  font-size: 0.88rem;
  margin-top: 4px;
}

.login-form__divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  font-family: var(--font-data);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.login-form__divider::before,
.login-form__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--text-muted);
  opacity: 0.4;
}

.login-form__guest {
  width: 100%;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.login-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow);
}

@media (max-width: 640px) {
  .login-wrap { flex-direction: column; }
  .login-left { width: 100%; min-width: unset; padding: 40px 24px; }
  .login-left__title { font-size: 2.5rem; }
  .login-right { padding: 32px 20px; }
  .login-card { padding: 28px 24px; }
}
</style>
