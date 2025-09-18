<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/Users';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const credentials = reactive({ email: '', password: '' });

const onLogin = async () => {
  try {
    await authStore.login(credentials);
    router.push('/contacts'); // Redirige vers l’interface protégée
  } catch (err) {
    alert(authStore.getError);
  }
};
</script>

<template>
  <form @submit.prevent="onLogin">
    <input v-model="credentials.email" type="email" placeholder="Email" required />
    <input v-model="credentials.password" type="password" placeholder="Mot de passe" required />
    <button type="submit" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Connexion...' : 'Se connecter' }}
    </button>
  </form>
</template>
