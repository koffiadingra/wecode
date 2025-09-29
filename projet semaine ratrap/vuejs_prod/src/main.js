import './assets/main.css'

import { createApp } from 'vue'
// import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/Users';

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app')
