<template>
  <CardsTrello />
</template>
<script setup>
import CardsTrello from '../components/CardsTrello.vue'
import { useCategoriesStore } from '../stores/categories'
import { onMounted } from 'vue'
const store = useCategoriesStore()

onMounted(() => {
  store.fetchCategories()
})
</script>
