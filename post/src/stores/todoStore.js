import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const loading = ref(false)
  const error = ref('')
  const filter = ref('all')

  
  const filteredTodos = computed(() => {
    if (filter.value === 'active') return todos.value.filter(t => !t.completed)
    if (filter.value === 'completed') return todos.value.filter(t => t.completed)
    return todos.value
  })

  const remaining = computed(() => todos.value.filter(t => !t.completed).length)

  
  const fetchTodos = async () => {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch('https://post-it.epi-bluelock.bj/notes')
      if (!res.ok) throw new Error('Erreur chargement')
      const data = await res.json()

      if (!Array.isArray(data)) throw new Error('Format API inattendu')

      todos.value = data.map(t => ({
        _id: t.tirrid ?? t.id, // <-- utilise tirrid si dispo, sinon id
        title: t.title,
        content: t.content,
        completed: t.completed ?? false,
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (title, content = '') => {
    const newTodo = { title, content, completed: false }
    try {
      const res = await fetch('https://post-it.epi-bluelock.bj/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      if (!res.ok) throw new Error('Échec ajout')
      const saved = await res.json()

      todos.value.unshift({
        _id: saved.tirrid ?? saved.id,
        title: saved.title,
        content: saved.content,
        completed: saved.completed ?? false,
      })
    } catch (err) {
      error.value = err.message
    }
  }

  const toggleTodo = async (todo) => {
    try {
      const res = await fetch(`https://post-it.epi-bluelock.bj/notes/${todo._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      if (!res.ok) throw new Error('Échec mise à jour')
      todo.completed = !todo.completed
    } catch (err) {
      error.value = err.message
    }
  }

  const updateTodo = async (todo) => {
    try {
      const res = await fetch(`https://post-it.epi-bluelock.bj/notes/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: todo.title,
          content: todo.content,
          completed: todo.completed,
        }),
      })
      if (!res.ok) throw new Error('Échec mise à jour')
      const updated = await res.json()

      const idx = todos.value.findIndex((t) => t._id === todo._id)
      if (idx !== -1) {
        todos.value[idx] = {
          _id: updated.tirrid ?? updated.id,
          title: updated.title,
          content: updated.content,
          completed: updated.completed ?? false,
        }
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteTodo = async (_id) => {
    try {
      if (!confirm('Voulez-vous vraiment supprimer cette tâche ?')) return
      const res = await fetch(`https://post-it.epi-bluelock.bj/notes/${_id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Échec suppression')
      todos.value = todos.value.filter((t) => t._id !== _id)
    } catch (err) {
      error.value = err.message
    }
  }

  const setFilter = (type) => {
    filter.value = type
  }

  
  return {
    todos,
    filteredTodos,
    remaining,
    loading,
    error,
    filter,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    setFilter,
  }
})
