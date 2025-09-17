    import { defineStore } from 'pinia';

    export const useDataStore = defineStore('data', {
      state: () => ({
        items: [],
        loading: false,
        error: null,
      }),
      actions: {
        async fetchData() {
          this.loading = true;
          this.error = null;
          try {
            const response = await fetch('https://api-contact.epi-bluelock.bj/api/users/login');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.items = data;
          } catch (e) {
            this.error = e.message;
            console.error("Erreur lors de la récupération des données :", e);
          } finally {
            this.loading = false;
          }
        },
      },
      getters: {
        getItems: (state) => state.items,
        getLoading: (state) => state.loading,
        getError: (state) => state.error,
      },
    });
