import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AcceuilView from '@/views/AcceuilView.vue'
import SigninView from '@/views/SigninView.vue'
import LoginView from '@/views/LoginView.vue'
import AddCommentView from '@/views/AddCommentView.vue'
import SettingView from '@/views/SettingView.vue'
import Admin_AllusersView from '@/views/Admin_AllusersView.vue'
import Admin_AllcommentsView from '@/views/Admin_AllcommentsView.vue'
import HelpView from '@/views/HelpView.vue'
import Admin_Numberusers_and_commentsView from '@/views/Admin_Numberusers_and_commentsView.vue'
import MycommentsView from '@/views/MycommentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    {
      path: '/',
      name: 'Acceuil',
      component: AcceuilView,
    },
    {
      path: '/Register',
      name: 'Register',
      component: SigninView,
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/Addcomment',
      name: 'Addcomment',
      component: AddCommentView,
    },
    {
      path: '/SettingView',
      name: 'SettingView',
      component: SettingView,
    },
    {
      path: '/Admin_AllusersView',
      name: 'Admin_AllusersView',
      component: Admin_AllusersView,
    },
    {
      path: '/Admin_AllcommentsView',
      name: 'Admin_AllcommentsView',
      component: Admin_AllcommentsView,
    },
    {
      path: '/Admin_Numberusers_and_commentsView',
      name: 'Admin_Numberusers_and_commentsView',
      component: Admin_Numberusers_and_commentsView,
    },
    {
      path: '/HelpView',
      name: 'HelpView',
      component: HelpView,
    },
    {
      path: '/myComments',
      name: 'myComments',
      component: MycommentsView,
    },
  ],
})

export default router
