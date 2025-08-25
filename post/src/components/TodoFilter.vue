<template>
  <div class="flex gap-2">
    <button @click="set('all')" :class="btnClass('all')">Tous</button>
    <button @click="set('active')" :class="btnClass('active')">Actifs</button>
    <button @click="set('completed')" :class="btnClass('completed')">Terminés</button>
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todoStore'

export default {
  setup() {
    const todoStore = useTodoStore()

    const set = (f) => {
      todoStore.setFilter(f)
    }

    const btnClass = (type) =>
      `px-3 py-1 rounded ${todoStore.filter === type ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`

    return { set, btnClass }
  },
}
</script>
