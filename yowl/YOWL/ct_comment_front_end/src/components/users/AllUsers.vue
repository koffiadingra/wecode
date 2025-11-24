<template>
  <div class="bg-white rounded-lg shadow p-4">
    <header id="head" class="h-20 flex items-center mb-4">
      <div class="relative w-[40rem] ml-10">
        <input
          type="search"
          placeholder="Search"
          class="w-full rounded-md px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
        <i class="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-2"></i>
      </div>
    </header>

    <h2 class="text-xl font-semibold mb-4">All Users</h2>
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Update</th>
          <th class="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">{{ }}</td>
          <td class="px-4 py-2">{{ }}</td>
          <td class="p-3">
            <button class="px-3 py-1">
              <ModifyComment/>
            </button>
          </td>
          <td>
            <button>
              <DeleteComment/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ModifyComment from '../comments/ModifyComment.vue';
import DeleteComment from '../comments/DeleteComment.vue';
</script>
