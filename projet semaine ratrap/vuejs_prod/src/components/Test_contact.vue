<script setup>
import { onMounted, computed } from 'vue';
import { useContactStore } from '@/stores/ContactStrore';
import { useAuthStore } from '@/stores/Users';
import { useRouter } from 'vue-router';

const contactStore = useContactStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (authStore.isAuthenticated) {
    contactStore.fetchContacts();
  } else {
    router.push('/login');
  }
});

const loading = computed(() => contactStore.getLoading);
const error = computed(() => contactStore.getError);
const contacts = computed(() => contactStore.getAllContacts);
</script>

<template>
  <div v-if="loading">Chargement des contacts...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.firstname }} {{ contact.lastname }} — {{ contact.email }}
        <button @click="contactStore.deleteContact(contact.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>
