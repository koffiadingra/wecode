<template>
  <div class="flex gap-2 mb-4">
    <button @click="set('all')" :class="btnClass('all')">Tous</button>
    <button @click="set('active')" :class="btnClass('active')">Actifs</button>
    <button @click="set('completed')" :class="btnClass('completed')">Terminés</button>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore'
const store = useTodoStore()
const set = (f) => store.setFilter(f)
const btnClass = (type) => `px-3 py-1 rounded ${store.filter === type ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
</script>
