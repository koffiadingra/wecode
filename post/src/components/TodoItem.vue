<template>
  <div class="p-4 bg-white border rounded shadow flex flex-col gap-2">
    <div v-if="!editing">
      <h3 class="font-bold text-lg">{{ todo.title }}</h3>
      <p class="text-gray-700">{{ todo.content }}</p>
      <div class="flex gap-2 mt-2">
        <button
          @click="editing = true"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          Modifier
        </button>
        <button
          @click="store.deleteTodo(todo._id)"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Supprimer
        </button>
      </div>
    </div>

    <div v-else>
      <input
        v-model="editTitle"
        type="text"
        class="border p-2 w-full rounded mb-2"
      />
      <textarea
        v-model="editContent"
        class="border p-2 w-full rounded mb-2"
      ></textarea>
      <div class="flex gap-2">
        <button
          @click="save"
          class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Enregistrer
        </button>
        <button
          @click="cancel"
          class="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const props = defineProps({
  todo: { type: Object, required: true },
})

const store = useTodoStore()
const editing = ref(false)
const editTitle = ref(props.todo.title)
const editContent = ref(props.todo.content)

const save = () => {
  store.updateTodo({
    _id: props.todo._id,
    title: editTitle.value,
    content: editContent.value,
    completed: props.todo.completed,
  })
  editing.value = false
}

const cancel = () => {
  editing.value = false
  editTitle.value = props.todo.title
  editContent.value = props.todo.content
}
</script>
