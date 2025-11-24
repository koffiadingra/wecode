<script setup>
import OnePost from '@/components/OnePost.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <OnePost :post-id="route.params.id" />
</template>
