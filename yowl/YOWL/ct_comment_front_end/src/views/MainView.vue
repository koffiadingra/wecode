<script setup>
import router from '@/router'
import { user_con } from '@/stores/users'

const conne = user_con()

if (conne.user.email === '') {
  router.push('/')
}
import ApercuView from '@/components/main/ApercuView.vue'
import AddComments from '@/components/comments/AddComments.vue'
import MyComments from '@/components/comments/MyComments.vue'
import { ref } from 'vue'
const phrases = ref('')
const liens = ref([])

fetch('http://localhost:8000/api/posts')
  .then((response) => response.json())
  .then((data) => {
    const donnees = data.data
    liens.value = donnees.sort((a, b) => b.id - a.id)
  })

const rechercher = () => {

  if (phrases.value.trim() != '') {
    liens.value = []
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rechercher: phrases.value,
      }),
    }

    fetch('http://127.0.0.1:8000/api/search', request)
      .then((response) => response.json())
      .then((data) => (liens.value = data))
  } else {
    phrases.value = ''
    liens.value = []
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rechercher: phrases.value,
      }),
    }

    fetch('http://127.0.0.1:8000/api/search', request)
      .then((response) => response.json())
      .then((data) => (liens.value = data))
  }
}
</script>

<template>
  <div class="">
    <nav class="couleur sm:h-[246px] h-[120px]">
      <div class="max-w-screen-xl px-10 flex items-center">
        <div class="sm:mt-16">
          <p class="md:text-4xl font-bold text-white mb-5">Search for something</p>
          <div class="w-full max-w-lg min-w-[200px]">
            <div class="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600"
                @click="rechercher"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                v-model="phrases"
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pr-10 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="search..."
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="flex my-8 mx-2 justify-center items-center">
    <RouterLink to="/main">
      <p class="home">Home</p>
    </RouterLink>
    <div class="ml-auto md:mr-5 flex">
      <router-link to="/Addcomment"><AddComments /></router-link>
      <router-link to="/myComments"><MyComments /></router-link>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center">
    <div v-for="lien in liens" :key="lien.id">
      <ApercuView :lien_post="lien.post_url" :user_id="lien.users_id" :id_post="lien.id" />
    </div>
  </div>
</template>

<style scoped>
.home {
  font-family: 'kavoon';
  color: #094265;
  font-size: 26px;
}
.couleur {
  background: linear-gradient(35deg, #aad6f2, #84a7bd, #8bb4ce);
}
</style>
