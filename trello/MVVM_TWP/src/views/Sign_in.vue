<template>
  <div class="p-6 max-w-sm mx-auto bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Connexion</h2>

    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>

    <input v-model="username" type="text" placeholder="Nom d'utilisateur"
      class="border rounded px-2 py-1 mb-2 w-full" />
    <input v-model="password" type="password" placeholder="Mot de passe"
      class="border rounded px-2 py-1 mb-2 w-full" />

    <button @click="signIn"
      class="bg-green-500 text-white px-3 py-2 rounded w-full hover:bg-green-600">
      Se connecter
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async signIn() {
      this.error = null;
      try {
        const response = await fetch("http://localhost:8000/wp-json/jwt-auth/v1/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        if (!response.ok) throw new Error("Échec de connexion");
        const data = await response.json();

        
        localStorage.setItem("token", data.token);
        alert("Connexion réussie !");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
