import { defineStore } from 'pinia'

export const user_con = defineStore('user_connection', {
  state: () => {
    return {
      user: {},
      find: '',
    }
  },
  actions: {
    connection() {
      if (localStorage.getItem('user') !== '' && typeof localStorage.getItem('user') !== 'object') {
        this.user = JSON.parse(localStorage.getItem('user'))
      } else {
        this.user = {
          email: '',
          admin: 0,
        }
      }
    },
  },
})
