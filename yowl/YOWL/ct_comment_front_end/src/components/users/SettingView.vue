<script setup>
import monLogo from '@/assets/CT.COMMENTS.png';
</script>

<template>
<div class="flex min-h-screen bg-gray-100">
  <aside class="w-64 shadow-md bg-gray-200">
     <img :src="monLogo" alt="logo"  />
  </aside>
  <div class="flex-1 flex flex-col">
    <header class="bg-blue-300 shadow-md p-4 flex justify-between items-center">
      <div class="flex items-center gap-4 px-20 texte-blue-950">
        <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-white font-bold"></div>
        <h3>username</h3>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="flex" style="color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          <h3>help</h3>
        </div>
      </div>
    </header>
    <main class="p-6 space-y-6">

    </main>
  </div>
</div>
</template>

<style scoped>
</style>
