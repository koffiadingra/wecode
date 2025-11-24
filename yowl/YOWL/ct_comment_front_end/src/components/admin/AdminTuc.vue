<template>
  <div class="flex sm:items-center sm:justify-center w-full h-full">
    <div class="flex items-center justify-center w-[968px] h-[500px] bg-slate-100 rounded-lg shadow-lg mx-4">
      <div class="flex items-center justify-center">
        <button class="w-[97px] h-[83px] rounded-full bg-green-200">
          <i class="fa-solid fa-users text-green-600"></i>
        </button>
        <div class="mx-4">
          <p class="text-gray-400">Total Users</p>
          <h1 class="font-bold">{{ totalUsers.toLocaleString() }}</h1>
        </div>

        <button class="w-[97px] h-[83px] rounded-full bg-green-200">
          <i class="fa-regular fa-message text-green-600"></i>
        </button>
        <div class="mx-4">
          <p class="text-gray-400">Total Comments</p>
          <h1 class="font-bold">{{ totalComments.toLocaleString() }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'


const totalUsers = ref(0)
const totalComments = ref(0)
const loading = ref(true)
const error = ref(null)


const fetchTotalUsers = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users`)
    if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs')
    const data = await response.json()
    totalUsers.value = Array.isArray(data) ? data.length : (data.data?.length || 0)
  } catch (err) {
    error.value = `Erreur users: ${err.message}`
    console.error(err)
  }
}


const fetchTotalComments = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/comments`)
    if (!response.ok) throw new Error('Erreur lors de la récupération des commentaires')
    const data = await response.json()
    totalComments.value = Array.isArray(data) ? data.length : (data.data?.length || 0)
  } catch (err) {
    error.value = `Erreur comments: ${err.message}`
    console.error(err)
  }
}


onMounted(async () => {
  await Promise.all([
    fetchTotalUsers(),
    fetchTotalComments()
  ])
  loading.value = false
})
</script>
