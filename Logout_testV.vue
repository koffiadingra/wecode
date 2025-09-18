<script setup>
import { useAuthStore } from '@/stores/User';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <button @click="handleLogout">Déconnexion</button>
</template>
