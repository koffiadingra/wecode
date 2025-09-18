<script setup>
import { onMounted, computed } from 'vue'
import { useContactStore } from '@/stores/ContactStore'
import { useAuthStore } from '@/stores/Users'
import { useRouter } from 'vue-router'

const contactStore = useContactStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (authStore.isAuthenticated) {
    contactStore.fetchContacts()
  } else {
    router.push('/login')
  }
})

const loading = computed(() => contactStore.getLoading)
const error = computed(() => contactStore.getError)
const contacts = computed(() => contactStore.getAllContacts)
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-full p-2">
    <div class="container max-w-6xl">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Table Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-800">contacts list</h2>
              <!-- <p class="text-gray-500 mt-1">on demand byte-torrent streaming</p> -->
            </div>
            <div class="mt-4 md:mt-0">

              <router-link to="/myContact">
                <button
                  class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                >
                  view my contact
                </button>
              </router-link>

            </div>
          </div>
          <!-- <form @submit.prevent="addContact">
            <input type="text" v-model="newContact.name" placeholder="Nom">
            <input type="text" v-model="newContact.phone" placeholder="Téléphone">
            <input type="text" v-model="newContact.email" placeholder="email">
            <input type="text" v-model="newContact.gender" placeholder="gender">
            <button type="submit">
              {{ updateContact === -1 ? 'add' : 'update' }}
            </button>
          </form> -->

          <!-- Search and Filter -->
          <div class="mt-6 flex flex-col sm:flex-row gap-4">
            <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                placeholder="magnet link..."
              />
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  firstname
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  lastname
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  numbers
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  editContact
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  deleteContact
                </th>
              </tr>
            </thead>
            <div v-if="loading">loarding...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <tbody class="bg-white divide-y divide-gray-200" v-else>
              <tr
                v-for="contact in contacts"
                :key="contact.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <!-- <div class="h-10 w-10 flex-shrink-0 rounded-full bg-slate-500 text-center text-white pt-2">
                     {{ contact.firstname[0] }}
                  </div> -->
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ contact.firstname }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contact.lastname }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contact.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contact.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap bg-blue-300">
                  <button @click="updateContact(contact)">Edit</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium bg-red-300">
                  <button @click="contactStore.deleteContact(contact.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <!-- <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between flex-col sm:flex-row">
          <div class="mb-4 sm:mb-0">
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">24</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                1
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </a>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                8
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                9
              </a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>
