import axios from 'axios'
// import { useRouter } from 'vue-router';
// import { onMounted, ref } from 'vue'

import { defineStore } from 'pinia'
// import EditPost from '@/components/EditPost.vue';

export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [],
        status: 'publish',
        // router: useRouter(),
        loading: false,
        error: null,
    }),

    actions: {
        async fetchPosts() {
            this.loading = true
            this.error = null

            try {
                const response = await axios.get('http://localhost:8000/wp-json/wp/v2/posts?per_page=100&_fields=id,title,content,categories')
                this.posts = response.data
                console.log(this.posts)
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async createPost(id, title) {
            // console.log(title, content);

            const url = 'http://localhost:8000/wp-json/wp/v2/posts'

            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('HAS :05895413jH@'),
            }

            const data = {
                categories: id,
                title: title,
                // content: content,
                status: 'publish',
            }

            await axios.post(url, data, { headers: headers })
            this.fetchPosts()
        },

        async deletePost(id) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
            }
            await axios.delete(`http://localhost:8000/wp-json/wp/v2/posts/${id}`, { headers: headers })
            this.fetchPosts()
        },

        async fetchPost(id) {
            this.loading = true
            this.error = null

            try {
                const response = await axios.get(
                        `http://localhost:8000/index.php/wp-json/wp/v2/posts/${id}`,
                    )
                    // this.posts = response.data;
                    // console.log(this.response.data)
                this.title = response.data.title.rendered
                console.log(this.title)

                this.content = response.data.content.rendered.replace(/<[^>]*>/g, '')
                    // this.content = this.contents.replace('</p>', '')
                console.log(this.content)
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async editPost(id, title, content) {
            console.log(title, content)
            console.log(id)

            const url = `http://localhost:8000/index.php/wp-json/wp/v2/posts/${id}`

            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('HAS:05895413jH@'),
            }

            const data = {
                title: title,
                content: content,
                status: 'publish',
            }

            await axios.put(url, data, { headers: headers })
            this.fetchPosts()
        },
    },
})

// const title = ref('')
// const content = ref('')

// const fetchNote = async () => {
//   const res content= await axios.get(`http://localhost:8000/index.php/wp-json/wp/v2/posts/${id}`)
//   console.log(res.data)
//   title.value = res.data.title.rendered
//   console.log(title.value)
//   content.value = res.data.content.rendered
//   console.log(content.value)

// }

// const editPost = async () => {
//   const url = `http://localhost:8000/index.php/wp-json/wp/v2/posts/${id}`

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Basic ' + btoa('root:05895413jH@')
//   }

//   const data = {
//     title: title.value,
//     content: content.value,
//     status: 'publish'
//   }

//   await axios.put(url, data, { headers: headers })
//   router.push('/')
// };
