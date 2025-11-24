<script setup>
import { ref } from 'vue'
import ReplyComment from '../comments/ReplyComment.vue'
import { user_con } from '@/stores/users'
import router from '@/router'

const liens = defineProps({
  lien_post: String,
  user_id: Number,
  id_post: Number,
})

const info = ref([])
const displayModal = ref(false)
const commentaires = ref([])
const commentCount = ref(0)
const commentaire = ref('')
const name = ref('')
const user_infomation = user_con()

function showComment() {
  displayModal.value = true
  console.log(liens.id_post)
  fetch('http://localhost:8000/api/comments/' + liens.id_post)
    .then((response) => response.json())
    .then((data) => {
      commentaires.value = data.sort((a, b) => b.id - a.id)
    })
}

const delComment = (element) => {
  commentaires.value = commentaires.value.filter((i) => i != element)
  const request = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  fetch('http://localhost:8000/api/comments/' + element.id, request)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
  commentCount.value--
}

async function delePost() {
  const request = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  await fetch('http://localhost:8000/api/posts/' + liens.id_post, request)
  info.value = ''
  window.location.reload()
}

const request = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: liens.lien_post,
  }),
}
fetch('http://127.0.0.1:8000/api/metaDonnees', request)
  .then((response) => response.json())
  .then((data) => {
    info.value = data
  })
function counpteur() {
  fetch('http://127.0.0.1:8000/api/comments/' + liens.id_post)
    .then((response) => response.json())
    .then((data) => {
      commentCount.value = data.length
    })
}
counpteur()
const userCreated = () => {
  fetch('http://127.0.0.1:8000/api/show/' + liens.user_id)
    .then((response) => response.json())
    .then((data) => {
      name.value = data.data.name
    })
}

function closeModal() {
  displayModal.value = false
  commentaires.value = []
}
const addComments = () => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: user_infomation.user.id,
      post_id: liens.id_post,
      comment: commentaire.value,
    }),
  }

  fetch('http://127.0.0.1:8000/api/comments/add', request).then((response) => response.json())
  commentCount.value++
  commentaire.value = ''
}
</script>

<template>
  {{ console.log(info.length) }}
  <div v-if="info.length == 0">wait ..</div>
  <div v-else class="shadow-sm border border-slate-200 rounded-lg h-[580px] w-[350px] mx-5 my-4">
    <a :href="info.url" class="relative flex flex-col mt-6 bg-white w-auto mx-3 border-b">
      <div class="h-[150px] m-2.5 overflow-hidden text-white rounded-md flex">
        <img v-if="info.image" :src="info.image" alt="card-image" class="h-100 w-100" />
        <img v-else src="/not.jpg" alt="card-image" class="h-100 w-100" />
      </div>
      <div class="p-4 h-[150px]">
        <div class="flex items-center mb-2">
          <h6 v-if="info.title" class="text-slate-800 text-xl font-semibold">{{ info.title }}</h6>
          <h6 v-else class="text-slate-800 text-xl font-semibold">Title Not Found</h6>
        </div>

        <p v-if="info.description" class="text-slate-600 leading-normal font-light">
          {{ info.description }}
        </p>
        <p v-else class="text-slate-600 leading-normal font-light">Description Not Found</p>
      </div>
    </a>
    <form @submit.prevent="" class="w-auto bg-white p-2">
      <div class="flex px-4 items-center">
        <img :src="info.image" alt="User Avatar" class="w-10 h-10 rounded-full mr-3" />
        <div class="max-w-[150px]">
          <h3 v-if="info.length !== 0" class="font-semibold truncate">
            {{ (userCreated(), name) }}
          </h3>
        </div>
        <div
          v-if="user_infomation.user.id == liens.user_id"
          class="ml-auto h-auto w-auto flex space-x-2"
        >
          <button @click="delePost(info)" class="text-red-800">delete</button>
        </div>
      </div>
      <div class="px-3 mb-2 mt-2">
        <textarea
          v-model="commentaire"
          placeholder="Comments anything"
          class="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
        ></textarea>
      </div>
      <div class="flex px-4">
        <ReplyComment @click="addComments" />
        <div @click="showComment()" class="flex ml-auto items-center">
          <span class="mx-2">{{ commentCount }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </div>
      </div>
    </form>
  </div>

  <!-- Main modal -->
  <div
    data-dialog-backdrop-close="{{ displayModal }}"
    v-if="displayModal"
    id="static-modal"
    data-modal-backdrop="static"
    class="flex overflow-y-auto overflow-x-hidden fixed justify-center items-center z-20 w-auto inset-0 transition-opacity duration-300 backdrop-blur-[2px] border mx-5"
  >
    <div class="w-2xl border rounded-lg sm:mx-auto px-4">
      <article
        class="mb-3 text-base border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
      >
        <div class="p-3 md:flex md:justify-end">
          <button
            @click="closeModal"
            type="button"
            class="text-blue-400 couleur bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-blue-200 dark:bg-blue-500 dark:hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <i class="fa-solid fa-arrow-left"></i>Retour
          </button>
        </div>
        <div class="flex items-center justify-center">
          <!-- card -->
          <div
            class="w-full bg-blue-100 rounded-lg shadow-sm dark:bg-white-100 dark:border-gray-100 px-3"
          >
            <div>
              <ul class="divide-y divide-gray-50 dark:divide-gray-300">
                <!-- url -->
                <div class="flex items-center px-3 px-auto">
                  <a :href="info.url" class="py-4 text-gray-900 dark:text-black mx-auto font-bold">
                    <p>{{ info.title }}</p>
                    <p>{{ info.description }}</p>
                  </a>
                </div>

                <li v-for="commentaire in commentaires" :key="commentaire" class="py-4">
                  <div class="grid mb-4">
                    <div class="flex-1 min-w-0 px-5">
                      <p class="font-medium text-gray-900 truncate dark:text-gray-800">
                        {{ commentaire.comment }}
                      </p>
                      <button class="text-blue-900 mr-4">edit</button>
                      <button @click="delComment(commentaire)" class="text-red-800">delete</button>
                      <div class="flex items-center">
                        <img
                          class="w-8 h-8 rounded-full mt-1"
                          src="/src/assets/profile-picture-1.jpg"
                          alt="User image"
                        />

                        <p
                          v-if="commentaire.user_id"
                          class="text-gray-700 truncate dark:text-gray-400 mt-2 ml-2"
                        >
                          Anonymous
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<style scoped>
p,
h6,
h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits to 3 lines */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.couleur {
  background: linear-gradient(35deg, #d7edfb);
}
</style>
