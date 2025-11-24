<script setup>
import AddComment from '@/components/comments/AddComment.vue'
import router from '@/router'
import { user_con } from '@/stores/users'

const conne = user_con()

if (conne.user.email === '') {
  router.push('/')
}
</script>

<template>
  <AddComment />
</template>
