<script setup>
import GetstartedButton from '../button/GetstartedButton.vue'
</script>

<template>
  <div class="flex justify-center md:justify-start sm:justify-start relative w-full h-screen">
    <div class="mb-70">
      <router-link to="/Register"><GetstartedButton /></router-link>
      <div class="mx-4 text-center sm:hidden block">
        <p class="text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam alias quos dolor nesciunt,
          veniam suscipit velit quod!
        </p>
      </div>
    </div>
    <img
      src="/src/assets/Get.jpg"
      alt="cover"
      class="absolute bg-cover bg-center w-full h-full -z-10"
    />
  </div>
</template>
