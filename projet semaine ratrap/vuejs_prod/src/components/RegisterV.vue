<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">name :</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div>
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">password :</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <!-- <div>
      <label for="password">confirm_password :</label>
      <input type="password" id="password"  required />
    </div> -->
    <button type="submit" :disabled="authStore.loading">
      {{ authStore.loading ? 'Enregistrement...' : 'Enregistrer' }}
    </button>
    <p v-if="authStore.error" style="color: red;">{{ authStore.error }}</p>
    <!-- <p v-else style="color: green;">register succefull</p> -->
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/Users';
const authStore = useAuthStore();
const username = ref('');
const email = ref('');
const password = ref('');
// const confirm_password = ref('');

const handleSubmit = async () => {
  try {
    await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value,
      // confirm_password:confirm_password.value,
    });
    alert('Utilisateur enregistré avec succès !');
  } catch (e) {
    console.error('Erreur dans le composant formulaire:', e);
  }
};
</script>
