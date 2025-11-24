<script setup>
import PostTrelo from '@/components/PostTrelo.vue';
import { onMounted } from 'vue';

import { usePostStore } from '@/stores/Post';

const store = usePostStore();

onMounted(() => {
  store.fetchPosts();
})
</script>

<template>
  <main>
    <PostTrelo />
  </main>
</template>
