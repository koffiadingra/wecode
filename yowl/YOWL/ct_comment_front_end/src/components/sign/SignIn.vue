<template>
  <div class="relative flex flex-col sm:items-center sm:justify-center w-full h-full">
    <!-- cover -->
    <img
      src="/src/assets/cover.jpeg"
      alt="cover"
      class="absolute bg-cover bg-center w-full h-full -z-10 opacity-50 sm:opacity-20"
    />

    <!-- Titre  -->
    <div class="flex justify-between my-5 w-3/5 sm:justify-center">
      <button
        type="button"
        class="p-2 rounded-lg mx-9 sm:hidden block dark:hover:bg-slate-100 items-center"
      >
        <router-link to="#"><i class="fa-solid fa-arrow-left-long"></i></router-link>
      </button>
      <h1 class="text-[36px] fontt sm:underline">Login</h1>
    </div>

    <!-- Contenu principal -->
    <div class="flex items-center justify-between w-full sm:w-[790px]">
      <!-- Image -->
      <div class="hidden sm:block">
        <div class="flex justify-center items-center w-[394px] h-[582px]">
          <img src="/src/assets/SignUp.jpg" alt="covers" class="w-[374px] h-[562px] rounded-lg" />
        </div>
      </div>

      <!-- Formulaire -->
      <div class="flex items-center justify-center w-full sm:h-full">
        <form @submit.prevent="Login" class="w-[358px] sm:mx-4">
          <div v-if="error" class="mb-2 text-sm text-center">
            <p class="text-red-500">{{ error }}</p>
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm text-gray-500">Email Address*</label>
            <input
              v-model="email"
              type="email"
              class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm text-gray-500">Password*</label>
            <input
              v-model="password"
              type="password"
              class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            class="text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 w-full"
          >
            Connect
          </button>
          <div class="flex items-start mb-5 mt-3">
            <p class="text-indigo-500">You don't have an account?</p>
            <router-link to="/Register" class="ml-2 underline text-red-500">Register</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user_con } from '@/stores/users'

const connect = user_con()

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const Login = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    })
    console.log(response.data)

    const { user, status_code } = response.data

    // console.log(token)

    if (status_code === 200) {
      localStorage.setItem('user', JSON.stringify(user))
      connect.connection()
      router.push('/main')
    } else {
      error.value = 'incorrect password or incorrect email'
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.fontt {
  color: #1da1f2;
  font-family: 'Kdam Thmor';
}
</style>
