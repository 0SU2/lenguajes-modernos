import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import DashboarPage from '@/pages/dashboard/DashboarPage.vue'
import EmpleadosPage from '@/pages/modules/EmpleadosPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
    },
    {
      path: '/dashboard',
      name: 'DashboarPage',
      component: DashboarPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/empleados',
      name: 'EmpleadosPage',
      component: EmpleadosPage,
      meta: { requiresAuth: true },
    },
  ],
})

// Middleware
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if(to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
})

export default router
