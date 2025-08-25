<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow">
    <h2 class="text-lg font-bold mb-2">Ajouter une note</h2>
    <input
      v-model="title"
      type="text"
      placeholder="Titre"
      class="border p-2 w-full rounded mb-2"
    />
    <textarea
      v-model="content"
      placeholder="Contenu"
      class="border p-2 w-full rounded mb-2"
    ></textarea>
    <button
      @click="add"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Ajouter
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const store = useTodoStore()
const title = ref('')
const content = ref('')

const add = () => {
  if (title.value.trim() && content.value.trim()) {
    store.addTodo(title.value, content.value)
    title.value = ''
    content.value = ''
  }
}
</script>
