import { createRouter, createWebHistory } from 'vue-router'
import ContactsView from '../views/ContactsView.vue'
import LoginView from '../views/LoginView.vue'
import ContactFormView from '../views/ContactFormView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'

const routes = [
  { path: '/', component: ContactsView },
  { path: '/login', component: LoginView },
  { path: '/contacts/new', component: ContactFormView, meta: { requiresAuth: true } },
  { path: '/contacts/:id', component: ContactDetailView, meta: { requiresAuth: true } },
  { path: '/contacts/:id/edit', component: ContactFormView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const isGuest = sessionStorage.getItem('guest') === 'true'

  if (!token && !isGuest && to.path === '/') {
    next('/login')
  } else if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/')
  } else {
    next()
  }
})

export default router
