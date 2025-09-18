import { defineStore } from 'pinia';
import { useAuthStore } from './Users';

export const useContactStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    isLoading: false,
    error: null,
    newContact: { firstname: '', lastname: '', phone: '', email: '' ,gender: ''},
  }),

  actions: {
    async fetchContacts() {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        this.error = "Veuillez vous connecter pour accéder aux contacts.";
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('https://api-contact.epi-bluelock.bj/api/contacts?page=1&perPage=all&order=desc', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.contacts = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async addContact(contactData) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        this.error = "Veuillez vous connecter pour ajouter un contact.";
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('https://api-contact.epi-bluelock.bj/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`,
          },
          body: JSON.stringify(contactData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const newContact = await response.json();
        this.contacts.push(newContact);
        this.newContact = { firstname: '', lastname: '', phone: '', email: '' };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },


    async updateContact(contact) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        this.error = "Veuillez vous connecter pour modifier un contact.";
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api-contact.epi-bluelock.bj/api/contacts/${contact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`,
          },
          body: JSON.stringify(contact),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const updatedContact = await response.json();
        const index = this.contacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) this.contacts[index] = updatedContact;

      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },


    async deleteContact(contactId) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        this.error = "Veuillez vous connecter pour supprimer un contact.";
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api-contact.epi-bluelock.bj/api/contacts/${contactId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authStore.token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        this.contacts = this.contacts.filter(c => c.id !== contactId);
        alert('Contact supprimé avec succès ');

      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    getAllContacts: (state) => state.contacts,
    getContactById: (state) => (id) => state.contacts.find(contact => contact.id === id),
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },
});
