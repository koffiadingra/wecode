import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddCatView.vue'
import AllView from '../views/AllCatView.vue'
import EditView from '@/views/EditView.vue'
import PostView from '@/views/PostView.vue'
import OnePostView from '@/views/OnePostView.vue'
import AddCatView from '../views/AddCatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'allcat',
      component: AllView,
    },
    {
      path: '/addcat',
      name: 'addcat',
      component: AddCatView,
    },
    {
      path: '/post',
      name: 'post',
      component: PostView,
    },
    {
      path: '/addposts',
      name: 'addpost',
      component: AddView,
    },
    {
      path: '/editpost/:id',
      name: 'editpost',
      component: EditView,
    },
    {
      path: '/onepost/:id',
      name: 'onepost',
      component: OnePostView,
    },
    {
      path: '/Post',
      name: 'Post',

      component: () => import('../views/Post.vue'),
    },

    {
      path: '/Sign_in',
      name: 'Sign_in',

      component: () => import('../views/Sign_in.vue'),
    },
  ],
})

export default router
