<template>
  <div class="flex items-start justify-center pt-20 px-5">
    <div class="bg-[#2020207a] w-full lg:w-2/3 h-[500px] rounded-2xl border">
      <div class="w-full h-20 flex items-center justify-between border-b">
        <div class="w-1/2 h-full flex items-center justify-start pl-10">
          <select class="p-2 border rounded-lg text-white" name="cat" id="cat">
            <option v-for="cat in store.categories" :key="cat.id" :value="cat.id">
              <p v-if="cat.id !== 1">{{ cat.name }}</p>
            </option>
          </select>
        </div>
        <div class="w-1/2 h-full flex items-center justify-end pr-10">
          <button @click="handelete($route.params.id)">
            <i class="fa-solid fa-trash p-2 text-red-500 text-xl"></i>
          </button>
        </div>
      </div>
      <div class="w-full h-104 flex items-center justify-start">
        <div class="w-[500px] lg:w-2/3 h-full px-4 py-4">
          <form @submit.prevent="senform">
            <div
              class="w-full h-12 text-lg text-white inline-flex justify-start items-center pl-4 gap-2 mb-2"
            >
              <div class="relative w-6">
                <input
                  type="checkbox"
                  v-model="checkedPosts"
                  :value="storePost.id"
                  :id="'toggle-' + storePost.id"
                  class="absolute block rounded-full appearance-none cursor-pointer peer"
                />
                <label
                  :for="'toggle-' + storePost.id"
                  class="block h-6 w-6 rounded-full border border-gray-300 cursor-pointer peer-checked:bg-green-500"
                ></label>
                <span class="absolute -top-1 left-1 text-black text-md hidden peer-checked:block">
                  ✔
                </span>
              </div>
              <!-- Titre affiché ou input si édition -->
              <span
                v-if="isEdit !== storePost.id"
                @dblclick="isEdit = storePost.id"
                :class="[
                  'text-3xl pl-2 font-extrabold w-full cursor-pointer',
                  checkedPosts.includes(storePost.id) ? 'line-through text-gray-400' : '',
                ]"
              >
                {{ storePost.title }}
              </span>

              <input
                v-else
                v-model="storePost.title"
                type="text"
                class="text-3xl text-start pl-2 font-extrabold w-full text-white bg-transparent border-b border-gray-400 focus:outline-none"
                @keyup.enter="finishEdit(storePost)"
                @blur="finishEdit(storePost)"
              />
            </div>
            <div class="w-full flex flex-col items-center justify-start pl-4">
              <div class="w-full text-white flex items-center justify-start gap-2">
                <i class="fa-regular fa-file-lines"></i>
                <p>Description</p>
              </div>
              <div class="w-full">
                <textarea
                  v-model="storePost.content"
                  class="w-full rounded-lg bg-[#9c9c9c34] p-2 text-white my-2"
                  name=""
                  id=""
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  class="rounded-md resize-none bg-indigo-800 py-2 px-6 text-lg text-white hover:bg-indigo-600 hover:scale-105 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="grow h-full bg-[#2b2a2a63] p-4">
          <div class="w-full flex items-center justify-start gap-4 text-xl mb-4">
            <i class="fa-regular fa-comments text-white"></i>
            <h2 class="text-white">Comments and activity</h2>
          </div>
          <div>
            <input
              v-model="comments.commentData"
              type="text"
              placeholder="Write a comment..."
              class="pl-4 w-full bg-[#9c9c9c34] h-14 rounded-xl text-white"
            />
            <center>
              <button
                @click="comments.addComment(props.postId)"
                class="add my-2 px-4 py-2 bg-indigo-800 rounded-lg text-white hover:bg-indigo-600 hover:scale-105 focus:outline-none"
              >
                Add Comment
              </button>
            </center>
          </div>
          <div class="max-h-[200px] overflow-y-auto text-white">
            <div v-for="item in comments.items" :key="item.id">
              <div>
                <h3>
                  <span class="underline">Author:</span>
                  <span class="font-semibold text-gray-300">{{ item.author_name }}</span>
                </h3>
              </div>
              <div
                class="pl-2 w-full bg-[#a1a0a041] h-12 rounded-lg my-2 flex items-center justify-between"
              >
                <div
                  v-if="comments.editId !== item.id"
                  class="flex items-center justify-between gap-2 w-full"
                >
                  <p v-html="item.content.rendered"></p>
                  <div>
                    <button @click="handleDeleteComment(item.id)">
                      <i class="fa-solid fa-trash p-2 text-red-500"></i>
                    </button>
                    <!-- <button @click="comments.deleteComment(item.id)">
                      <i class="fa-solid fa-trash p-2 text-red-500"></i>
                    </button> -->
                    <button @click="comments.startEdit(item)">
                      <i class="fa-solid fa-edit p-2 text-blue-500"></i>
                    </button>
                  </div>
                </div>
                <div v-else class="flex items-center justify-between w-full">
                  <input
                    v-model="comments.newComment"
                    type="text"
                    placeholder="nouveau commentaire..."
                    class="border rounded px-2 py-1 w-3/4"
                  />
                  <div class="flex items-center justify-end grow pr-2 gap-2">
                    <button @click="comments.editComment(comments.editId)">
                      <i class="fa-solid fa-download text-blue-500 text-xl"></i>
                    </button>
                    <button @click="comments.cancelEdit">
                      <i class="fa-solid fa-xmark text-red-500 text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '../stores/categories'
import { onMounted, watch, ref } from 'vue'
import { usePostStore } from '@/stores/Post'
import { useCommentsStore } from '@/stores/Comment'
import { useRoute, useRouter } from 'vue-router'

const storePost = usePostStore()
const route = useRoute()
const router = useRouter()
const store = useCategoriesStore()
const comments = useCommentsStore()
const checkedPosts = ref([])
const isEdit = ref(null)
const id = route.params.id

const props = defineProps({
  postId: { type: Number, required: true },
})

onMounted(() => {
  store.fetchCategories()
  storePost.fetchPosts()
  storePost.fetchPost(id)
  comments.fetchComments(props.postId)
  const saved = localStorage.getItem('checkedPosts')
  if (saved) {
    checkedPosts.value = JSON.parse(saved)
  }
})

watch(
  checkedPosts,
  (newVal) => {
    localStorage.setItem('checkedPosts', JSON.stringify(newVal))
  },
  { deep: true },
)

const senform = () => {
  (storePost.editPost(id, storePost.title, storePost.content), router.push('/'))
}

function handelete(id) {
  const isconfirmed = confirm('Are you sure to want deleting this post ?')

  if (!isconfirmed) {
    return
  }

  storePost.deletePost(id)
  router.push('/')
}

function handleDeleteComment(id) {
  const isconfirmed = confirm('Are you sure to want deleting this comment ?')

  if (!isconfirmed) {
    return
  }

  comments.deleteComment(id)
  router.push('/')
}

function finishEdit(post) {
  isEdit.value = null;
  storePost.editPost(post.id, post.title)
}
</script>
