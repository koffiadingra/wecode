<template>
  <div class="flex items-start justify-center pt-20 px-5">
    <div class="bg-[#2020207a] w-full lg:w-2/3 h-[500px] rounded-2xl border">
      <div class="w-full h-20 flex items-center justify-between border-b">
        <!-- <div class="w-1/2 h-full flex items-center justify-start pl-10">
          <select class="p-2 border rounded-lg" name="cat" id="cat">
            <option value="cat1">cat1</option>
            <option value="cat2">cat2</option>
            <option value="cat3">cat3</option>
          </select>
        </div> -->
        <!-- <div class="w-1/2 h-full flex items-center justify-end pr-10">
          <button><i class="fa-solid fa-trash text-xl text-white"></i></button>
        </div> -->
      </div>
      <div class="w-full h-104 flex items-center justify-start">
        <form @submit.prevent="senform">
        <div class="w-[500px] lg:w-2/3 h-full px-4">
          <div class="w-full h-20 flex items-center justify-start pl-4 mb-10">
            <input type="checkbox" name="" id="" />
            <input v-model="store.title"
              type="text"
              class="text-3xl text-start pl-2 text-white font-extrabold line-clamp-1 w-full"
            />
          </div>
          <div class="w-full flex flex-col items-center justify-start pl-4">
            <div class="w-full text-white">
              <p>Description</p>
            </div>
            <div class="w-full">
              <textarea v-model="store.content" class="w-full rounded-lg bg-gray-500" name="" id="" rows="4"></textarea>
              <button type="submit" class="resize-none bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">Send</button>
            </div>
          </div>
        </div>
        </form>
<!--
    <form @submit.prevent="senform">
    <div class="mb-4">
      <label for="text" class="text-sm leading-7 text-gray-600">Title</label>
      <input v-model="store.title" type="text" id="title" name="title"
        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
    </div>
    <div class="mb-4">
      <label for="description" class="text-sm leading-7 text-gray-600">Description</label>
      <textarea v-model="store.content" id="description" name="description"
        class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
    </div>
    <button type="submit"
      class="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">Send</button>
  </form> -->


        <div class="grow h-full bg-[#2b2a2a63] p-4">
          <div class="w-full flex items-center justify-start gap-4 text-xl mb-4">
            <i class="fa-regular fa-comments text-white"></i>
            <h2 class="text-white">Comments and activity</h2>
          </div>
          <div>
            <input
              v-model="commentData"
              type="text"
              placeholder="Votre commentaire..."
              class="pl-4 w-full bg-slate-100 h-14 rounded-xl mb-4"
            />
            <button @click="comments.addComment(postId)" class="add mt-2 w-full">Ajouter</button>
          </div>
          <div v-for="item in comments.items" :key="item.id">
            <div>
              <h3>{{ item.author_name }}</h3>
            </div>
            <div
              class="pl-4 w-full bg-slate-300 h-12 rounded-lg mb-4 flex items-center justify-between"
            >
              <p v-html="item.content.rendered"></p>
              <div class="flex gap-2 mt-2"></div>
              <div>
                <button @click="comments.deleteComment(item.id)">
                  <i class="fa-solid fa-trash p-2 text-red-500">supprimer</i>
                </button>
                <button @click="comments.startEdit(item)">
                  <i class="fa-solid fa-trash p-2 text-blue-400">Modifier</i>
                </button>
              </div>
              <div v-if="comments.editId === item.id" class="flex gap-2 mt-2">
                <input
                  v-model="comments.newComment"
                  type="text"
                  placeholder="nouveau commentaire..."
                  class="border rounded px-2 py-1 w-full"
                />
                <button @click="comments.editComment(editId)">
                  <i class="fa-solid fa-trash p-2 text-red-500">Enregistrer</i>
                </button>
                <button @click="comments.cancelEdit" class="mt-2 w-full bg-gray-200">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import HeaderTrello from "../components/HeaderTrello.vue";
// import CardsTrello from "../components/CardsTrello.vue";
// import { ref } from 'vue';
// import { useCategoriesStore } from '../stores/categories'
// import { onMounted } from 'vue'
// // import { useRouter } from 'vue-router'
// import { usePostStore } from '@/stores/Post'
// // import { post } from 'jquery';

// const storePost = usePostStore()
// // const title = ref('')
// // const content = ref('')
// // const router = useRouter()
// // import { useRoute, useRouter } from 'vue-router'

// // const route = useRoute()
// // const router = useRouter()
// const store = useCategoriesStore()
// // const editedContent = ref("safi");
// // const isEditing = ref(false);

// // const addCat = () => {
// //   isEditing.value = true;
// // };

// // const addPost = () => {
// //   isEditing.value = true;
// // };

// // const handleEnter = (id) => {
// //   console.log(id);
// //   store.updateCategory(event.target.value, id);
// //   console.log('value: ', event.target.value);

// // };

// // const saveChanges = () => {
// //   store.createCategory(editedContent.value);
// //   alert('create posts');
// //   isEditing.value = false;
// // };

// onMounted(() => {
//   store.fetchCategories()
//   storePost.fetchPosts()
// })

import { onMounted } from 'vue'
import { useRouter, useRoute  } from 'vue-router';
import { usePostStore } from '@/stores/Post';
import {useCommentsStore} from'@/stores/Comment';
const store = usePostStore();
const router = useRouter();

onMounted(() => {
  store.fetchPost(id);
})

const route = useRoute()
const id = route.params.id

const senform = () =>{
  store.editPost(id, store.title,store.content),
  router.push('/')
}
  const props = defineProps( {
    postId: {type:Number,required:true}
  });
  const comments = useCommentsStore();
  onMounted(()=>{
    comments.fetchComments(props.postId)
  })

// console.log(storePost.createPost);

// const saveChangesPost = () => {
//   storePost.createPost(title.value);
//   alert('create cat');
//   isEditing.value = false;
// };

// function handelete(id) {
//   const isconfirmed = confirm("Are you sure to ")

//   if(!isconfirmed) {
//     return
//   }

//   storePost.deletePost(id)
// }
//   function handleDelete (id) {
//     const isConfirmed = confirm("Are you sure to want deleting this category ?")
//     console.log(id);

//     if (!isConfirmed) {
//       return
//     }

//     store.deleteCategory(id);
//   }
</script>

<!-- <script>
export default {
  props: {
    postId: {required:true}
  },
  data() {
    return {
      items: [],
      commentData: '',
      newComment: '',
      editId: null,
      isLoading: true,
      error: null,

    }
  },
  async mounted() {
    await this.fetchComments()
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/wp-json/wp/v2/comments?posts=`+ this.postId
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const data = await response.json()
        this.items = data
        // console.log("Commentaires récupérés :", data);
      } catch (error) {
        this.error = `Impossible de récupérer les données : ${error.message}`
        console.error('Erreur lors de la récupération des données :', error)
      } finally {
        this.isLoading = false
      }
    },
    async addComment() {
      const postId = this.currentid
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments?post=`+ postId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('HAS:05895413jH@'),
          },
          body: JSON.stringify({

            post: postId,
            status: 'publish',
            author_name:this.author_name,
            content: this.commentData,
          }),
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const newComment = await response.json()
        this.items.push(newComment)
        this.commentData = ''
        // console.log(newComment)
      } catch (error) {
        this.error = `Impossible d'ajouter le commentaire : ${error.message}`
        console.error("Erreur lors de l'ajout du commentaire :", error)
      } finally {
        this.isLoading = false
      }
    },
    async editComment(commentId) {
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
          },
          body: JSON.stringify({
            content: this.newComment,
          }),
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const updatedComment = await response.json()
        const index = this.items.findIndex((item) => item.id === commentId)
        if (index !== -1) {
          this.items.splice(index, 1, updatedComment)
        }
      } catch (error) {
        this.error = `Impossible de modifier le commentaire : ${error.message}`
        console.error('Erreur lors de la modification du commentaire :', error)
      } finally {
        this.isLoading = false
      }
    },
    async deleteComment(commentId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
          },
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        this.items = this.items.filter((item) => item.id !== commentId)
      } catch (error) {
        this.error = `Impossible de supprimer le commentaire : ${error.message}`
        console.error('Erreur lors de la suppression du commentaire :', error)
      } finally {
        this.isLoading = false
      }
    },
    startEdit(item) {
      this.editId = item.id
      this.newComment = item.content.rendered.replace(/<[^>]*>/g, '')
    },
    cancelEdit() {
      this.editId = null
      this.newComment = ''
    },
  },
}
</script> -->