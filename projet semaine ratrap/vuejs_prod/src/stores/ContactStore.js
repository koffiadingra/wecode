import { defineStore } from 'pinia';

export const useContactStore = defineStore('contacts', {
  state: () => ({
  contacts: [],
  isLoading: false,
  error: null,
  newContact : {firstname: '',lastname:'', phone: '',email:''},
  }),
  // getters: {
  //   getAllContacts: (state) => state.contacts,
  //   getContactById: (state) => (id) => state.contacts.find(contact => contact.id === id),
  //     },
    actions: {
      async fetchContacts() {
      this.isLoading = true;
      this.error = null;
      try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.contacts = await response.json();
      } catch (error) {
            this.error = error;
      } finally {
            this.isLoading = false;
      }
      },
      async addContact(newContact) {
      this.isLoading = true;
      this.error = null;
      try{
      const response = await fetch('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.contacts.push(data);
      }catch(error){
        this.error = error;
      }finally{
        this.isLoading = false;
      }
      },
      async updateContact(contact) {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch(`/api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const index = this.contacts.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.contacts[index] = data;
          }
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
      async deleteContact(contactId) {
        this.isLoading = true;
        this.error = null;
        try{
          const response = await fetch(``,{
            method: 'DELETE',
            headers : {
              'content-Type' : 'application/json',
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`Contact with ID ${contactId} deleted successfully.`);
          alert('delete succefull')
        }catch(error){
          this.error = error.message;
        }
      },
    },
});
