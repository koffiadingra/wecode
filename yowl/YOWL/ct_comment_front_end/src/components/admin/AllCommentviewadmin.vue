<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h2 class="text-xl font-semibold mb-4">All Comments</h2>

    <div v-if="error" class="bg-red-100 text-red-700 p-3 mb-4 rounded">
      {{ error }}
    </div>

    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-50 text-left text-gray-600 text-sm font-medium">
          <th class="px-4 py-2">Username</th>
          <th class="px-4 py-2">Comment</th>
          <th class="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="comment in comments" :key="comment.id" class="border-t">
          <td class="px-4 py-3">{{ getUserName(comment.user_id) }}</td>
          <td class="px-4 py-3">{{ comment.comment }}</td>
          <td class="px-4 py-3">
            <button
              @click="deletecomments(comment.id)"
              class="bg-red-200 text-red-600 px-3 py-1.5 rounded hover:bg-red-300 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const users = ref([])
const comments = ref([])
const loading = ref(false)
const error = ref(null)

const fetchallcomments = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/comments`)
    if (!response.ok) throw new Error('Erreur réseau')
    const data = await response.json()
    comments.value = data
  } catch (err) {
    error.value = `Erreur lors de la récupération des commentaires : ${err.message}`
    console.error('Erreur fetch comments:', err)
  } finally {
    loading.value = false
  }
}


const fetchallusers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users`)
    if (!response.ok) throw new Error('Erreur réseau')
    const data = await response.json()
    users.value = data.data
  } catch (err) {
    error.value = `Erreur lors de la récupération : ${err.message}`
    console.error('Erreur fetch users:', err)
  } finally {
    loading.value = false
  }
}

const getUserName = (userId) => {
  const user = users.value.find(u => u.id === userId)
  return user ? user.name : 'Utilisateur inconnu'
}


const deletecomments = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer ce commentaire ?')) return

  loading.value = true
  error.value = null
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/comments/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    await fetchallcomments()
    alert('Commentaire supprimé')
  } catch (err) {
    error.value = `Erreur lors de la suppression : ${err.message}`
    console.error('Erreur delete comment:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchallcomments()
  fetchallusers()
})
</script>
