<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute  } from 'vue-router';
import { usePostStore } from '@/stores/Post';

const store = usePostStore();
const router = useRouter();

onMounted(() => {
  store.fetchPost(id);
})


const route = useRoute()
const id = route.params.id

const senform = () =>{
  store.editPost(id, store.title,store.content),
  router.push('/')
}

</script>
<template>
    <form @submit.prevent="senform">
    <div class="mb-4">
      <label for="text" class="text-sm leading-7 text-gray-600">Title</label>
      <input v-model="store.title" type="text" id="title" name="title"
        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
    </div>
    <div class="mb-4">
      <label for="description" class="text-sm leading-7 text-gray-600">Description</label>
      <textarea v-model="store.content" id="description" name="description"
        class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
    </div>
    <button type="submit"
      class="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">Send</button>
  </form>

</template>
