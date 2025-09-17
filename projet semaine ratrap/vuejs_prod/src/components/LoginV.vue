    <template>
      <div>
        <button @click="fetchData">Charger les données</button>
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error">Erreur : {{ error }}</div>
        <ul v-else-if="items.length">
          <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </template>

    <script setup>
    import { onMounted } from 'vue';
    import { useDataStore } from '@/stores/Login';
    import { storeToRefs } from 'pinia';

    const dataStore = useDataStore();
    const { items, loading, error } = storeToRefs(dataStore);
    onMounted(() => {
      dataStore.fetchData();
    });
    </script>
