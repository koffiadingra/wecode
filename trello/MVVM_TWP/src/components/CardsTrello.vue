<template>
  <div class="w-full h-full overflow-x-scroll flex items-start justify-start shrink-0 gap-4 p-4">
    <div v-for="cat in store.categories" :key="cat.id">
      <div
        v-if="cat.id !== 1"
        class="relative w-[400px] rounded-xl shrink-0 bg-[#0000009f] p-2 text-white"
      >
        <div class="mb-2 inline-flex justify-start items-center">
          <input
            type="text"
            v-model="cat.name"
            @keyup.enter="handleEnter(cat.id, $event)"
            @blur="store.updateCategory(cat.name, cat.id)"
            class="text-2xl text-start pl-2 underline font-extrabold line-clamp-1 w-full"
          />
          <button @click="handleDeleteCat(cat.id)">
            <i class="fa-solid fa-trash p-2 text-red-700 text-xl"></i>
          </button>
        </div>
        <div class="w-full p-2 overflow-y-auto max-h-[700px] mb-16">
          <div
            v-for="note in storePost.posts.filter((p) => p.categories[0] === cat.id)"
            :key="note.id"
          >
            <div
              class="w-full h-12 bg-[#cac6c654] rounded-xl text-lg text-white inline-flex justify-start items-center pl-4 gap-2 mb-2 group"
              tabindex="0"
            >
              <div
                class="relative w-6 mr-2 align-middle select-none transition duration-200 ease-in"
              >
                <input
                  type="checkbox"
                  v-model="checkedPosts"
                  :value="note.id"
                  :id="'toggle-' + note.id"
                  class="absolute block rounded-full appearance-none cursor-pointer peer"
                />
                <label
                  :for="'toggle-' + note.id"
                  class="hidden group-hover:block group-focus:block peer-checked:block h-6 w-6 rounded-full border border-gray-300 cursor-pointer peer-checked:bg-green-500"
                ></label>
                <span class="absolute -top-1 left-1 text-black text-md hidden peer-checked:block">
                  ✔
                </span>
              </div>
              <router-link :to="'/onepost/' + note.id">
                <div class="flex items-center justify-start w-76">
                  <p :class="{ 'line-through text-gray-400': checkedPosts.includes(note.id) }">
                    {{ note.title.rendered }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 w-full h-auto p-4 bg-[#00000000] rounded-xl text-lg gap-2 flex justify-start items-center"
        >
          <div v-if="!isEditingPost" class="inline-flex justify-start items-center">
            <button
              @click="addPost(cat.id)"
              class="w-full h-full inline-flex justify-start items-center text-white"
            >
              <span class="text-2xl mr-2">+ </span> Add a card
            </button>
          </div>
          <div class="h-auto bg-black w-full" v-else-if="idCat === cat.id">
            <input
              class="w-full border h-20 text-start pl-4 bg-[#cac6c654] rounded-xl text-lg mb-2"
              v-model="title"
              placeholder="Enter a title"
            />
            <div class="flex items-center justify-start">
              <button class="px-4 py-2 bg-blue-500 mr-4" @click="saveChangesPost(cat.id)">
                Add Card
              </button>
              <button class="text-white text-4xl" @click="saveChangesCancelPost">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <div v-else class="inline-flex justify-start items-center">
            <button
              @click="addPost(cat.id)"
              class="w-full h-full inline-flex justify-start items-center text-white"
            >
              <span class="text-2xl mr-2">+ </span> Add a card
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-84 bg-[#aaabac6e] rounded-xl shadow-xl flex items-center justify-center text-white shrink-0"
    >
      <div v-if="!isEditing" class="w-full h-full">
        <button @click="addCat" class="w-full h-full text-xl text-start p-4">
          + Add another list
        </button>
      </div>
      <div class="h-auto p-2 bg-[#000000d0] w-full rounded-xl" v-else>
        <input
          class="w-full border text-start p-3 bg-[#cac6c654] rounded-md text-lg mb-2"
          v-model="editedContent"
          @blur="saveChanges"
          placeholder="Enter list name..."
        />
        <div class="flex items-center justify-start">
          <button class="px-4 py-2 bg-blue-500 mr-4" @click="saveChanges">Add Card</button>
          <button class="text-white text-4xl" @click="saveChangesCancel">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCategoriesStore } from '../stores/categories'
import { ref, onMounted, watch } from 'vue'
import { usePostStore } from '@/stores/Post'

const checkedPosts = ref([])
const storePost = usePostStore()
const title = ref('')
const store = useCategoriesStore()
const editedContent = ref('')
const isEditing = ref(false)
const isEditingPost = ref(false)
const idCat = ref()

const addCat = () => {
  isEditing.value = true
}

const saveChanges = () => {
  store.createCategory(editedContent.value)
  alert('create category')
  isEditing.value = false
}

const saveChangesCancel = () => {
  isEditing.value = false
}

const addPost = (id) => {
  idCat.value = id
  console.log(id)
  isEditingPost.value = true
}

const saveChangesPost = (id) => {
  console.log(id)
  console.log(title.value)

  storePost.createPost(idCat.value, title.value)

  alert('create post')
  isEditingPost.value = false
}

const saveChangesCancelPost = () => {
  isEditingPost.value = false
}

const handleEnter = (id, event) => {
  console.log(id)
  store.updateCategory(event.target.value, id)
  console.log('value: ', event.target.value)
  event.target.blur()
}

onMounted(() => {
  store.fetchCategories()
  storePost.fetchPosts()
  const saved = localStorage.getItem('checkedPosts')
  try {
    checkedPosts.value = saved ? JSON.parse(saved) : []
  } catch (e) {
    console.error(e);
    console.warn('localStorage checkedPosts invalid, resetting')
    checkedPosts.value = []
    localStorage.removeItem('checkedPosts')
  }
})

watch(
  checkedPosts,
  (newVal) => {
    localStorage.setItem('checkedPosts', JSON.stringify(newVal))
  },
  { deep: true },
)

function handleDeleteCat(id) {
  const isConfirmed = confirm('Are you sure to want deleting this category ?')
  console.log(id)

  if (!isConfirmed) {
    return
  }

  store.deleteCategory(id)
}
</script>
