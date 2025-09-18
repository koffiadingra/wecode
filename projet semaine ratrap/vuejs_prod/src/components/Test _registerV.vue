<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/User';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: '',
});

const onSubmit = async () => {
  try {
    await authStore.register(form);
    alert('Inscription réussie ! Veuillez vous connecter.');
    router.push('/login');
  } catch (err) {
    alert(authStore.getError);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.name" placeholder="Nom" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Mot de passe" required />
    <button type="submit" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Enregistrement...' : 'S’inscrire' }}
    </button>
  </form>
</template>
