<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { draggable } from './utils/draggable'

const demo = ref<HTMLElement>()
onMounted(async () => {
})
</script>

<template>
<div class="demo" ref="demo">
</div>
</template>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}
</style>

<style scoped>
.demo {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
</style>