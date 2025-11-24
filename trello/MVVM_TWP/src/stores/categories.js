import { defineStore } from 'pinia'
import axios from "axios";
export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: JSON.parse(localStorage.getItem('categories')) || [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('http://localhost:8000/wp-json/wp/v2/categories');
                this.categories = response.data;
            } catch (error) {
                this.error = 'Failed to fetch categories.';
                console.error('Error fetching categories:', error);
            } finally {
                this.loading = false;
            }
        },
        async createCategory(nameCat) {
            this.loading = true;
            this.error = null;
            const data = { "name": nameCat }
            const username = 'HAS';
            const password = '05895413jH@';
            const credentials = `${username}:${password}`;
            const encodedCredentials = btoa(credentials);
            const auth = `Basic ${encodedCredentials}`;
            const url = 'http://localhost:8000/wp-json/wp/v2/categories';
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth
                    }
                });
                this.categories.push(response.data);
                console.log(this.categories);

                console.log('create cat');
            } catch (error) {
                this.error = 'Failed to create category.';
                console.error('Error creating category:', error);
            } finally {
                this.loading = false;
            }
        },
        async updateCategory(nameCat, id) {
            this.loading = true;
            this.error = null;
            const data = { "name": nameCat }
            const username = 'HAS';
            const password = '05895413jH@';
            const credentials = `${username}:${password}`;
            const encodedCredentials = btoa(credentials);
            const auth = `Basic ${encodedCredentials}`;
            const url = `http://localhost:8000/wp-json/wp/v2/categories/${id}`;
            try {
                const response = await axios.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth
                    }
                });
                const index = this.categories.findIndex(cat => cat.id === id);
                if (index !== -1) {
                    this.categories[index] = response.data;
                }
                alert('update');
            } catch (error) {
                this.error = 'Failed to update category.';
                console.error('Error updating category:', error);
            } finally {
                this.loading = false;
            }
        },
        async deleteCategory(id) {
            this.loading = true;
            this.error = null;
            const username = 'HAS';
            const password = '05895413jH@';
            const credentials = `${username}:${password}`;
            const encodedCredentials = btoa(credentials);
            const auth = `Basic ${encodedCredentials}`;
            const url = `http://localhost:8000/wp-json/wp/v2/categories/${id}?force=true`;
            try {
                const response = await axios.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth
                    }
                });
                console.log(response);

                this.categories = this.categories.filter(cat => cat.id !== id);
            } catch (error) {
                this.error = 'Failed to delete category.';
                console.error('Error deleting category:', error);
            } finally {
                this.loading = false;
            }
        },
        // async deleteCategory(id) {
        //   console.log(id)
        //   try {
        //     const response = await fetch(`http://localhost:8000/wp-json/wp/v2/categories/${id}`, {
        //       method: 'DELETE',
        //     })
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! status: ${response.status}`)
        //     }
        //     this.data = this.data.filter(notes => notes.id !== id)
        //     localStorage.setItem('categories', JSON.stringify(this.categories))
        //     console.log(`Item with ID ${id} cancel witn successful !`)
        //   } catch (error) {
        //     console.error('Error deleting data :', error)
        //   }
        // },
    },
})
