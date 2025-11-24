<template>
  <div class="space-y-0 h-full mb-10">
    <div>
      <NavBar3 />
    </div>
    <div class="flex items-center">
      <p class="text-3xl text-sky-900 mx-8">Setting</p>
      <BackButton class="ml-auto" @click="retour" />
    </div>

    <form @submit.prevent="Modify" class="max-w-sm mx-auto">
      <div class="w-100 h-10 rounded-full flex items-center p-1 mb-5">
        <span class="text-blue-500 text-md w-1/2">update profile</span>
        <button
          @click="deconnection"
          type="button"
          class="py-2.5 px-6 text-sm bg-red-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-700 ml-auto"
        >
          Logout
        </button>
      </div>
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
          >Full Name*</label
        >
        <input
          type="name"
          v-model="nameEnter"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
        />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
          >Email Adress*</label
        >
        <input
          v-model="emailEnter"
          type="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email address"
        />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
          >password*</label
        >
        <input
          v-model="passwordEnter"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="password"
        />
      </div>
      <div class="block sm:block">
        <UpdateButton />
      </div>
    </form>
  </div>
</template>
<script setup>
import axios from 'axios'
import UpdateButton from './button/UpdateButton.vue'
import NavBar3 from './nav/NavBar3.vue'
import router from '@/router'
import { user_con } from '@/stores/users'
import { ref } from 'vue'
import BackButton from './button/BackButton.vue'

const nameEnter = ref('')
const emailEnter = ref('')
const passwordEnter = ref('')

const connect = user_con()
const id = ref(connect.user.id)

if (connect.user) {
  nameEnter.value = connect.user.name
  emailEnter.value = connect.user.email
}

const deconnection = () => {
  localStorage.setItem('user', '')
  connect.connection()
  router.push('/')
}

const Modify = async () => {
  if (passwordEnter.value != '') {
    const request = {
      name: nameEnter.value,
      email: emailEnter.value,
      password: passwordEnter.value,
    }
    const response = await axios.put(`http://localhost:8000/api/user/edit/${id.value}`, request)
    connect.user = response.data
    if (connect.user.status_code === 200) {
      localStorage.setItem('user', JSON.stringify(connect.user.data))
      connect.connection()
    }
  } else {
    const request = {
      name: nameEnter.value,
      email: emailEnter.value,
    }
    const response = await axios.put(`http://localhost:8000/api/user/edit/${id.value}`, request)
    connect.user = response.data
    if (connect.user.status_code === 200) {
      localStorage.setItem('user', JSON.stringify(connect.user.data))
      connect.connection()
    }
  }

  console.log(connect.user)
}
function retour() {
  window.history.back()
}
</script>
