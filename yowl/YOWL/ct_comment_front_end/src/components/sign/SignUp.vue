<script setup>
import RegisterButton from '../button/RegisterButton.vue'
</script>
<template>
  <div class="relative flex flex-col sm:items-center sm:justify-center w-full h-full">
    <!-- cover -->
    <img
      src="/src/assets/cover.jpeg"
      alt="cover"
      class="absolute bg-cover bg-center w-full h-full -z-10 opacity-50 sm:opacity-20"
    />

    <!-- Titre  -->
    <div class="flex justify-between my-5 w-2/3 sm:justify-center">
      <button
        type="button"
        class="p-2 rounded-lg mx-9 sm:hidden block dark:hover:bg-slate-100 items-center"
      >
        <router-link to="#"><i class="fa-solid fa-arrow-left-long"></i></router-link>
      </button>
      <h1 class="text-[36px] fontt underline hidden sm:block">CREATE YOUR ACCOUNT</h1>
      <h1 class="text-[36px] fontt sm:underline sm:hidden block">Sign Up</h1>
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
        <form @submit.prevent="Register" class="w-[358px] sm:mx-4">
          <div v-if="errors" class="mb-2 text-sm text-center">
            <p class="text-red-500">{{ errors }}</p>
          </div>
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm text-gray-500">Full Name</label>
            <input
              v-model="username"
              type="name"
              class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
              placeholder="Enter your full name"
              required
            />
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
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm text-gray-500">password confirm*</label>
            <input
              v-model="password_confirm"
              type="password"
              class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
              placeholder="password confirm"
              required
            />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                v-model="box"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label for="terms" class="ms-4 text-sm font-medium text-gray-500 dark:text-gray-500"
              >Are you between 13 and 35 years old?</label
            >
          </div>
          <RegisterButton />
          <div class="flex items-start mb-5 mt-3">
            <p class="text-indigo-500">Already have an account?</p>
            <router-link to="/Login" class="ml-2 underline text-red-500">Log in</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const password_confirm = ref('')
const box = ref(false)
const errors = ref('')

const Register = async () => {
  try {
    if (password.value !== password_confirm.value) {
      errors.value = 'The password must be the same as the confirmed password'
      return
    }
    if (password.value.length < 6) {
      errors.value = 'Password must be at least 6 characters'
      return
    }

    if (box.value === true) {
      // console.log('Les données sont envoyées car la case est cochée.')
      const response = await axios.post('http://localhost:8000/api/register', {
        name: username.value,
        email: email.value,
        password: password.value,
      })

      username.value = ''
      email.value = ''
      password.value = ''
      password_confirm.value = ''
      box.value = false

      errors.value = 'Registration successful !'

      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      router.push('/main')
    } else {
      // console.log('Les données ne sont envoyées car la case na pas été cochée.')
      errors.value = 'Sorry, you are out of age.'
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error)
  }
}
</script>

<style scoped>
.fontt {
  color: #1da1f2;
  /* font-family: 'Kdam Thmor'; */
}
</style>
