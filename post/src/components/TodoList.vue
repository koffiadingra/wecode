<template>
  <form action="" @submit.prevent="addtodo">
    <fieldset role="group">
      <input
      v-model="todo" type="text"
      placeholder="add post ">
      <button type=""> add an post</button>
  </fieldset>
  </form>
</template>
<script>
export default {
  name : 'TodoList'
}
</script>
