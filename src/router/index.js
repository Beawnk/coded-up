import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/contato',
      name: 'Contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/cursos',
      name: 'Courses',
      component: () => import('../views/CoursesView.vue'),
    }
  ],
})

export default router
