import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
        }

        const data = await response.json();
        this.user = data.user || data;
        console.log('Inscription réussie:', this.user);
        return data;
      } catch (error) {
        this.error = error.message;
        console.error('Erreur d\'enregistrement:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://api-contact.epi-bluelock.bj/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Identifiants invalides');
        }

        const data = await response.json();

        if (data.token) {
          this.token = data.token;
          localStorage.setItem('authToken', data.token);
        } else {
          throw new Error("Aucun token reçu");
        }

        this.user = data.user || null;
        if (this.user) {
          localStorage.setItem('authUser', JSON.stringify(this.user));
        }

        console.log('Connexion réussie');
        return data;
      } catch (error) {
        this.error = error.message;
        console.error('Erreur de connexion:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    
    async updateUser(updatedData) {
      if (!this.token) {
        this.error = "Non authentifié";
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api-contact.epi-bluelock.bj/api/users/${this.user?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Échec de la mise à jour');
        }

        const data = await response.json();
        this.user = { ...this.user, ...data.user };
        localStorage.setItem('authUser', JSON.stringify(this.user));
        console.log('Profil mis à jour ✅');
        return data;
      } catch (error) {
        this.error = error.message;
        console.error('Erreur de mise à jour:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    
    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      console.log('Déconnexion réussie ');
    },

    
    initializeAuth() {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('authUser');
      if (token) {
        this.token = token;
        this.user = user ? JSON.parse(user) : null;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getToken: (state) => state.token,
  },
});
