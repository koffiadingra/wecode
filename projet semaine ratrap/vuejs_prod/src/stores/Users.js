import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (userData.email === 'test@example.com') {
            throw new Error('Email already taken');
        }
        this.user = { email: userData.email, id: Date.now() };
        return true;
        // alert('succefull');
      } catch (err) {
        this.error = err.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
