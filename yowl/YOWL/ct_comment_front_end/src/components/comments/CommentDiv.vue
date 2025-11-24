<template>
  <!-- Button Retour -->
  <div class="p-3 md:flex md:justify-end">
    <button
      type="button"
      class="text-blue-400 couleur bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-blue-200 dark:bg-blue-500 dark:hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      <i class="fa-solid fa-arrow-left"></i>Retour
    </button>
  </div>
  <div class="flex items-center justify-center mt-6">
    <!-- card -->
    <div
      class="bg-red- w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-white-100 dark:border-gray-100"
    >
      <div class="flow-root">
        <ul class="divide-y divide-gray-200 dark:divide-gray-300">
          <!-- url -->
          <div class="flex items-center">
            <p class="py-3 sm:py-4 text-sm font-medium text-gray-900 truncate dark:text-black">
              www.link1.com
            </p>
          </div>
          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-800">
                  Comment 1
                </p>
                <div class="flex items-center shrink-0">
                  <img
                    class="w-8 h-8 rounded-full mt-4"
                    src="/src/assets/profile-picture-1.jpg"
                    alt="User image"
                  />
                  <p class="text-sm text-gray-700 truncate dark:text-gray-400 mt-2 ml-2">
                    Axel Hobou
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-800">
                  Comment 2
                </p>
                <div class="flex items-center shrink-0">
                  <img
                    class="w-8 h-8 rounded-full mt-4"
                    src="/src/assets/profile-picture-1.jpg"
                    alt="User image"
                  />
                  <p class="text-sm text-gray-700 truncate dark:text-gray-400 mt-2 ml-2">
                    adingra Koffi
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.couleur {
  background: linear-gradient(35deg, #d7edfb);
}
</style>
