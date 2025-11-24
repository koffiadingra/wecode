<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4">All Comments</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="border-b text-left">
          <th class="p-3 text-slate-300">Username</th>
          <th class="p-3 text-slate-300">Comments</th>
          <th class="p-3 text-slate-300">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="p-3">{{ }}</td>
          <td class="p-3">{{ }}</td>
          <td class="p-3">
            <button
              class="px-3 py-1 "
            >
              <DeleteComment/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>

import DeleteComment from './DeleteComment.vue'


</script>
