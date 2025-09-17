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
        const response = await fetch('https://api-contact.epi-bluelock.bj/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
        }

        const data = await response.json();
        this.user = data.user;
        console.log('Enregistrement réussi:', this.user);
        return data;
      } catch (error) {
        this.error = error.message;
        console.error('Erreur d\'enregistrement:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
