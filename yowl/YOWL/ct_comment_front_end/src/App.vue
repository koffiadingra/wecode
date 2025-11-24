<script setup>
import NavBarView from './components/nav/NavBarView.vue'
import FooterView from './components/main/FooterView.vue'
</script>

<template>
  <div class="max-w-[1500px] mx-auto h-screen">
    <NavBarView />
    <main>
      <router-view></router-view>
    </main>
    <FooterView />
  </div>
</template>

<style scoped>
/* button {
  background-color: rgb(64, 64, 230);
} */
</style>
