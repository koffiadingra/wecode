<script setup>
import router from '@/router'
import { user_con } from '@/stores/users'

const conne = user_con()

if (conne.user.email === '') {
  router.push('/')
}
import ContentSetting from '@/components/ContentSetting.vue'
</script>
<template>
  <ContentSetting />
</template>
