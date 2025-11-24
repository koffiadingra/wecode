
<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-4">
    <h2 class="text-xl font-bold mb-4">Commentaires</h2>
    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>

    <ul v-else>
      <li v-for="item in items" :key="item.id" class="border-b py-2">
        <p class="font-semibold">{{ item.author_name }}</p>
        <p v-html="item.content.rendered" class="couleur"></p>

        <div class="flex gap-2 mt-2">
          <button @click="deleteComment(item.id)" class="sup">Supprimer</button>
          <button @click="startEdit(item)" class="edit">Modifier</button>
        </div>
      </li>
    </ul>

    <div class="mt-4">
      <input v-model="commentData" type="text" placeholder="Votre commentaire..."
        class="border rounded px-2 py-1 w-full" />
      <button @click="addComment" class="add mt-2 w-full">Ajouter</button>
    </div>


    <div v-if="editId" class="mt-4">
      <input v-model="newComment" type="text" placeholder="Nouveau contenu..."
        class="border rounded px-2 py-1 w-full" />
      <button @click="editComment(editId)" class="class mt-2 w-full">Enregistrer</button>
      <button @click="cancelEdit" class="mt-2 w-full bg-gray-200">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      commentData: "",
      newComment: "",
      editId: null,
      error: null,
      isLoading: false,
    };
  },
  async mounted() {
    await this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/wp-json/wp/v2/comments?post=${this.postId}`
        );
        this.items = await response.json();
      } catch (error) {
        this.error = "Impossible de récupérer les commentaires";
      }
    },

    async addComment() {
      try {
        const response = await fetch("http://localhost:8000/wp-json/wp/v2/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("test:14249323S"),
          },
          body: JSON.stringify({
            post: this.postId,
            content: this.commentData,
          }),
        });
        const newComment = await response.json();
        this.items.push(newComment);
        this.commentData = "";
      } catch (error) {
        this.error = "Erreur ajout du commentaire";
      }
    },

    async editComment(commentId) {
      try {
        const response = await fetch(
          `http://localhost:8000/wp-json/wp/v2/comments/${commentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("test:14249323S"),
            },
            body: JSON.stringify({ content: this.newComment }),
          }
        );
        const updated = await response.json();
        const index = this.items.findIndex((c) => c.id === commentId);
        if (index !== -1) this.items.splice(index, 1, updated);
        this.newComment = "";
        this.editId = null;
      } catch (error) {
        this.error = "Erreur modification du commentaire";
      }
    },

    async deleteComment(commentId) {
      try {
        await fetch(`http://localhost:8000/wp-json/wp/v2/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Basic " + btoa("test:14249323S"),
          },
        });
        this.items = this.items.filter((c) => c.id !== commentId);
      } catch (error) {
        this.error = "Erreur suppression du commentaire";
      }
    },

    startEdit(item) {
      this.editId = item.id;
      this.newComment = item.content.rendered.replace(/<[^>]*>/g, "");
    },

    cancelEdit() {
      this.editId = null;
      this.newComment = "";
    },
  },
};
</script>

<style>
.couleur { color: blue; }
.sup { color: brown; }
.edit { color: green; }
.class { color: darkorchid; }
.add { color: coral; }
</style>
