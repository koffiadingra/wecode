<script setup>
import PostTrelo from '@/components/PostTrelo.vue';
import { onMounted } from 'vue';

import { usePostStore } from '@/stores/Post';

const store = usePostStore();

onMounted(() => {
  store.fetchPosts();
})
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <PostTrelo />
    <!-- <TheWelcome /> -->
  </main>
</template>
