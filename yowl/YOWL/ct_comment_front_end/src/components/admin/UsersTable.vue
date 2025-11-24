<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h2 class="text-xl font-semibold mb-4">All Users</h2>
    <div v-if="error" class="bg-red-100 text-red-700 p-3 mb-4 rounded">{{ error }}</div>

    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-50 text-left text-gray-600 text-sm font-medium">
          <th class="px-4 py-2">Username</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Update</th>
          <th class="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="px-4 py-3">{{ user.name }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="px-4 py-3">
            <button
              @click="editusers(user.id)"
              class="bg-emerald-200 text-emerald-600 px-3 py-1.5 rounded hover:bg-emerald-300 transition"
            >
              Modify
            </button>
          </td>
          <td class="px-4 py-3">
            <button
              @click="deleteusers(user.id)"
              class="bg-red-200 text-red-600 px-3 py-1.5 rounded hover:bg-red-300 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <form
          @submit.prevent="update"
          class="max-w-lg mx-auto p-6 bg-zinc-100 rounded-lg shadow-lg"
        >
          <div class="flex justify-between items-center mb-4">
            <button type="button" @click="closePopup" class="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <div class="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{{ error }}</div>

          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">FULL Name</label>
            <input
              v-model="nameInput"
              type="text"
              placeholder="Username"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email Address*</label
            >
            <input
              v-model="emailInput"
              type="email"
              placeholder="Enter your email address"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">password*</label>
            <input
              v-model="passwordInput"
              type="password"
              placeholder="Enter your password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-violet-600 text-white py-2.5 rounded-md shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-70 transition"
            >
              Modify
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import axios from 'axios'
import { onMounted, ref } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const idd = ref('')

const nameInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')

const showPopup = ref(false)

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

const closePopup = () => {
  showPopup.value = false
  // userId.value = null
}

const editusers = (id) => {
  const user = users.value.find((u) => u.id === id)
  if (!user) {
    error.value = 'Utilisateur non trouvé'
    return
  }

  nameInput.value = user.name
  emailInput.value = user.email
  passwordInput.value = ''

  idd.value = id
  showPopup.value = true
}

const update = async () => {
  const response = await axios.put(`http://127.0.0.1:8000/api/user/edit/${idd.value}`, {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  })
  users.value = response.data
  // alert('success updated user')
  closePopup()
  nameInput.value = ''
  emailInput.value = ''
  passwordInput.value = ''
}

const deleteusers = async (id) => {
  // if (!confirm('Are you sure you want to delete this user?')) return

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    await fetchallusers()
    // alert('user delete')
  } catch (err) {
    //moi
    error.value = `Erreur lors de la suppression : ${err.message}`
    console.error('Erreur delete:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchallusers()
})
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.popup-content {
  max-width: 90%;
  width: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
