<script setup>
import { ref } from 'vue'
import { user_con } from '@/stores/users'

const userInfom = user_con()

const url = ref('')
const comment = ref('')
const post_id = ref(0)

async function postAdd() {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post_url: url.value,
      users_id: userInfom.user.id,
    }),
  }
  await fetch('http://127.0.0.1:8000/api/posts/create', request)
    .then((response) => response.json())
    .then((data) => {
      post_id.value = data.data.id
    })
  const requestAddComment = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post_id: post_id.value,
      user_id: userInfom.user.id,
      comment: comment.value,
    }),
  }
  await fetch('http://127.0.0.1:8000/api/comments/add', requestAddComment)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })

  url.value = ''
  comment.value = ''
}

import BackButton from '../button/BackButton.vue'

function retour() {
  window.history.back()
}
</script>

<template>
  <!-- Formulaire -->
  <div class="flex sm:items-center sm:justify-center w-full h-screen">
    <form @submit.prevent="postAdd" class="w-[374px] mx-4">
      <div class="w-100 flex justify-center items-center">
        <button
          @click="retour"
          class="flex justify-center items-center ml-auto text-sm/6 font-semibold"
        >
          <BackButton />
        </button>
      </div>
      <button type="button" class="mb-10 bg-gray-100 color rounded-md">
        <p>add comments</p>
      </button>
      <div class="mb-5">
        <label for="text" class="block mb-2 text-gray-900">url</label>
        <input
          v-model="url"
          type="text"
          class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-300"
          placeholder="url site"
          required
        />
      </div>
      <div class="mb-5">
        <label for="text" class="block mb-2 text-gray-900">Comments</label>
        <input
          v-model="comment"
          type="text"
          id="text"
          class="shadow-xs bg-white border border-gray-200 text-gray text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-300"
          placeholder="Enter your comments"
          required
        />
      </div>
      <button
        type="submit"
        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-[186.95px] h-[45px] text-center dark:bg-indigo-600 dark:hover:bg-indigo-700"
      >
        Submit <i class="fa-solid fa-chevron-right"></i>
      </button>
    </form>
  </div>
</template>
<style scoped>
.color {
  color: #3691ca;
}
</style>
