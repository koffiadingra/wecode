<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">📒 Ma To-Do List</h1>

    <TodoInput />
    <TodoFilter />

    <div class="mt-6 space-y-4">
      <TodoItem v-for="t in store.filteredTodos" :key="t._id" :todo="t" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'

const store = useTodoStore()
onMounted(() => store.fetchTodos())
</script>
