<template>
  <div class="flex items-start justify-center pt-20 px-5">
    <div class="bg-[#2020207a] w-full lg:w-2/3 h-[500px] rounded-2xl border">
      <div class="w-full h-20 flex items-center justify-between border-b">
        <div class="w-1/2 h-full flex items-center justify-start pl-10">
          <select class="p-2 border rounded-lg" name="cat" id="cat">
            <option value="cat1">cat1</option>
            <option value="cat2">cat2</option>
            <option value="cat3">cat3</option>
          </select>
        </div>
        <div class="w-1/2 h-full flex items-center justify-end pr-10">
          <button><i class="fa-solid fa-trash text-xl text-white"></i></button>
        </div>
      </div>
      <div class="w-full h-104 flex items-center justify-start">
        <div class="w-[500px] h-full px-4">
          <div class="w-full h-20 flex items-center justify-start pl-4 mb-10">
            <input type="checkbox" name="" id="" />
            <input
              type="text"
              value="text"
              class="text-3xl text-start pl-2 text-white font-extrabold line-clamp-1 w-full"
            />
          </div>
          <div class="w-full flex flex-col items-center justify-start pl-4">
            <div class="w-full text-white">
              <p>Description</p>
            </div>
            <div class="w-full">
              <textarea class="w-full rounded-lg bg-slate-300" name="" id="" rows="4"></textarea>
            </div>
          </div>
        </div>
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
            <button @click="addComment" class="add mt-2 w-full">Ajouter</button>
          </div>
          <div v-for="item in items" :key="item.id">
            <div>
              <h3>{{ item.author_name }}</h3>
            </div>
            <div
              class="pl-4 w-full bg-slate-300 h-12 rounded-lg mb-4 flex items-center justify-between"
            >
              <p v-html="item.content.rendered"></p>
              <div class="flex gap-2 mt-2"></div>
              <div>
                <button @click="deleteComment(item.id)">
                  <i class="fa-solid fa-trash p-2 text-red-500">supprimer</i>
                </button>
                <button @click="startEdit(item)">
                  <i class="fa-solid fa-trash p-2 text-blue-400">Modifier</i>
                </button>
              </div>
              <div v-if="editId" class="flex gap-2 mt-2">
                <input
                  v-model="newComment"
                  type="text"
                  placeholder="nouveau commentaire..."
                  class="border rounded px-2 py-1 w-full"
                />
                <button @click="editComment(editId)">
                  <i class="fa-solid fa-trash p-2 text-red-500">Enregistrer</i>
                </button>
                <button @click="cancelEdit" class="mt-2 w-full bg-gray-200">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    postId: {
      postId: 105,
      required: true,
    },
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
          `http://localhost:8000/wp-json/wp/v2/comments?post=${this.postId}`,
        )
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const data = await response.json()
        this.items = data
      } catch (error) {
        this.error = `Impossible de récupérer les données : ${error.message}`
        console.error('Erreur lors de la récupération des données :', error)
      } finally {
        this.isLoading = false
      }
    },
    async addComment() {
      try {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
          },
          body: JSON.stringify({
            postId: this.postId,
            content: this.commentData,
          }),
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const newComment = await response.json()
        this.items.push(newComment)
        this.commentData = ''
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
</script>
