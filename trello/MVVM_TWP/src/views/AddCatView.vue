<template>
    <div class="bg-black w-[500px] h-[100px] m-auto mt-24 text-center text-2xl">
        <div v-if="!isEditing">
            <button class="border" @click="handleCat">
                + AddCat
            </button>
        </div>
        <div v-else>
            <input class="p-2 hidden" placeholder="Add cat">
            <button @click="handleCat">
                AddCat
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref("Contenu original de la div.");
const editedContent = ref(content.value);
const isEditing = ref(false);

const handleCat = () => {
  editedContent.value = content.value; // Initialiser l'input avec le contenu actuel
  isEditing.value = true;
};

// const saveChanges = () => {
//   content.value = editedContent.value;
//   isEditing.value = false;
// };
</script>
