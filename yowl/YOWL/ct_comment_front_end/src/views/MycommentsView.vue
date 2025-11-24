<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex items-end">
      <h2 class="text-2xl font-semibold mb-4">My Comments</h2>
      <BackButton class="ml-auto" @click="retour" />
    </div>

    <div class="flex my-8 mx-2 justify-center items-center">
      <div class="ml-auto md:mr-5 flex">
        <router-link to="/Addcomment"><AddComments /></router-link>
      </div>
    </div>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center space-x-5"
  >
    <div v-for="lien in liens" :key="lien.id">
      <ApercuView :lien_post="lien.post_url" :user_id="lien.users_id" :id_post="lien.id" />
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { user_con } from '@/stores/users'
import ApercuView from '@/components/main/ApercuView.vue'
import AddComments from '@/components/comments/AddComments.vue'
import { ref } from 'vue'

const conne = user_con()
const liens = ref([])

console.log(conne.user.id)

fetch('http://localhost:8000/api/posts/' + conne.user.id)
  .then((response) => response.json())
  .then((data) => {
    const donnees = data
    liens.value = donnees.sort((a, b) => b.id - a.id)
  })

if (conne.user.email === '') {
  router.push('/')
}
import BackButton from '@/components/button/BackButton.vue'

function retour() {
  window.history.back()
}
</script>
