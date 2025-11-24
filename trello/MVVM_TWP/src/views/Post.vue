<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ post.title?.rendered }}</h1>
    <div v-html="post.content?.rendered" class="mb-6"></div>

    <Comments :post-id="postId" />
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";

export default {
  components: { Comments },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {},
      postId: parseInt(this.id),
    };
  },
  async mounted() {
    await this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await fetch(
          `http://localhost:8000/wp-json/wp/v2/posts/${18}`
        );
        this.post = await response.json();
      } catch (error) {
        console.error("Erreur récupération du post :", error);
      }
    },
  },
};
</script>
