<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/Post';


const store = usePostStore();

onMounted(() => {
  store.fetchPosts();
})

function handelete(id) {
  const isconfirmed = confirm("Are you sure to ")

  if(!isconfirmed) {
    return
  }

  store.deletePost(id)
}

</script>
<template>
  <div class="flex flex-col h-screen bg-blue-600">
    <header class="shrink-0 flex justify-between bg-white px-4 py-3">
      <a class="text-2xl font-black tracking-tight" href="/">kanboard</a>
      <nav>
        <a class="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100" href="#">My boards</a>
        <button class="ml-3">
          <img class="h-9 w-9 inline rounded-full"
            src="https://pbs.twimg.com/profile_images/1333896976602193922/MtWztkxt_400x400.jpg" alt="">
        </button>
      </nav>
    </header>

    <main class="flex-1 overflow-hidden">
      <div class="flex flex-col h-full">
        <div class="shrink-0 flex justify-between items-center p-4">
          <h1 class="text-2xl text-white font-bold">Board title</h1>
          <div>
            <button
              class="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 font-medium text-sm text-white rounded-md">
              <span class="ml-1">Settings</span>
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-x-auto">
          <div class="inline-flex h-full items-start px-4 pb-4 space-x-4">
            <div class="w-72 bg-gray-200 h-auto flex flex-col rounded-md ">
              <div  class="flex items-center justify-between px-3 py-2">
                <h3 class="text-sm font-semibold text-gray-700">evgt</h3>
                <div class="hover:bg-gray-300 w-20 h-8  rounded-md grid place-content-center">
                  <div>
                    <router-link to="/addpost" href=""><i class="fa-solid fa-pen-to-square "></i></router-link>
                    <a href=""><i class="fa-solid fa-trash p-2"></i></a>
                  </div>
                </div>
              </div>
              <div class="pb-3 flex flex-col overflow-hidden ">
                <div v-for="note in store.posts" :key="note.id" class="px-3 flex-1 overflow-y-auto">
                  <ul class="space-y-3">
                    <li class="relative bg-white p-3 shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
                      <p class="text-sm">{{ note.title.rendered }}</p>
                      <!-- <p class="text-sm">{{ note.content.rendered }}</p>
                      <div v-html="note.content.rendered"></div> -->
                      <div
                        class="justify-beetween absolute top-1 right-1 w-15 h-8 bg-gray-50 group-hover:grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-200">
                        <div class="flex gap-4">
                          <router-link :to="`/editpost/${note.id}`" href=""><i class="fa-solid fa-pen-to-square "></i></router-link>
                          <button @click="handelete(note.id)"><i class="fa-solid fa-trash p-2"></i></button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="px-3 mt-3">
                  <RouterLink to="/addpost"
                    class="flex items-center p-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-300 w-full rounded-md">
                    <span class="ml-1">Add card</span>
                  </RouterLink>
                </div>
              </div>
            </div>

            <div class="w-72">
              <button
                class="flex items-center bg-white/10 w-full hover:bg-white/20 text-white p-2 text-sm font-medium rounded-md">
                <span class="ml-1">Add another list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

