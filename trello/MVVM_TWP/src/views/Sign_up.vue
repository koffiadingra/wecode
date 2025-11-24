<template>
  <div class="p-6 max-w-sm mx-auto bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Créer un compte</h2>

    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
    <div v-if="success" class="text-green-500 mb-2">{{ success }}</div>

    <input v-model="username" type="text" placeholder="Nom d'utilisateur"
      class="border rounded px-2 py-1 mb-2 w-full" />
    <input v-model="email" type="email" placeholder="Email"
      class="border rounded px-2 py-1 mb-2 w-full" />
    <input v-model="password" type="password" placeholder="Mot de passe"
      class="border rounded px-2 py-1 mb-2 w-full" />

    <button @click="signUp"
      class="bg-blue-500 text-white px-3 py-2 rounded w-full hover:bg-blue-600">
      S'inscrire
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
      success: null,
    };
  },
  methods: {
    async signUp() {
      this.error = null;
      this.success = null;
      try {
        const response = await fetch("http://localhost:8000/wp-json/wp/v2/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("test:14249323S"), 
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        if (!response.ok) throw new Error("Erreur inscription");
        const data = await response.json();
        this.success = `Utilisateur ${data.username} créé avec succès !`;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
