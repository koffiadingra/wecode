import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Test_loginV from '@/views/Test_loginV.vue'
import myContactV from '@/views/MyContactV.vue'
import RegisterV from '@/views/Test _registerV.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/DashboardV.vue'),
    },
    {
      path: '/Register',
      name: 'Register',
      component: RegisterV,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Test_loginV,
    },
    {
      path: '/myContact',
      name: 'myContact',
      component: myContactV,
    },

  ],
})

export default router
