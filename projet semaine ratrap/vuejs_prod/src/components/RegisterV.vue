<!-- RegistrationPage.vue -->
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/Users.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    authStore.error = 'Passwords do not match.';
    return;
  }

  const success = await authStore.register({
    email: email.value,
    password: password.value,
  });

  if (success) {
    router.push('/dashboard');
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Registering...' : 'Register' }}
      </button>
      <p v-if="authStore.error" style="color: red;">{{ authStore.error }}</p>
    </form>
  </div>
</template>

<!-- <style scoped>
/* Add your component-specific styles here */
</style> -->
