import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    items: [],
    commentData: '',
    newComment: '',
    editId: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchComments(postId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments?post=${postId}`)
        console.log(postId)

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)

        this.items = await response.json()
      } catch (error) {
        this.error = `Impossible de récupérer les données : ${error.message}`
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async addComment(postId) {
      if (!this.commentData.trim()) {
        this.error = 'Le commentaire est vide'
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
          },
          body: JSON.stringify({
            post: postId,
            content: this.commentData,
            author_name: 'HAS',
            author_email: 'test@gmail.com',
            status: 'approved',
          }),
        })

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)

        const newComment = await response.json()
        this.items.push(newComment)
        this.commentData = ''
        alert('Comment add');
      } catch (error) {
        this.error = `Impossible d'ajouter le commentaire : ${error.message}`
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async editComment(commentId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
          },
          body: JSON.stringify({ content: this.newComment }),
        })
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
        const updatedComment = await response.json()
        const index = this.items.findIndex((item) => item.id === commentId)
        if (index !== -1) this.items.splice(index, 1, updatedComment)
        this.cancelEdit()
        alert('Comment edit');
      } catch (error) {
        this.error = `Impossible de modifier le commentaire : ${error.message}`
      } finally {
        this.isLoading = false
      }
    },

    async deleteComment(commentId) {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch(
          `http://localhost:8000/wp-json/wp/v2/comments/${commentId}?force=true`,
          {
            method: 'DELETE',
            headers: {
              Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
            },
          },
        )
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
        this.items = this.items.filter((item) => item.id !== commentId)
      } catch (error) {
        this.error = `Impossible de supprimer le commentaire : ${error.message}`
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
})
