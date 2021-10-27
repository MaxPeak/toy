<script setup lang="ts">
import CompositeBar from '@bc/CompositeBar.vue'
import Sidebar from '@bc/Sidebar.vue'
import EditingArea from '@bc/EditingArea.vue'

const setOSClass = () => {
  const ua = navigator.userAgent.toLocaleLowerCase()
  let os = ''
  if (/macintosh|mac os x/i.test(ua)) {
    os = 'mac'
  } else if (/win32|wow32|win64|wow64/i.test(ua)) {
    os = 'windows'
  }
  document.body.classList.add(os)
}
setOSClass()
</script>

<template>
  <CompositeBar/>
  <Sidebar/>
  <EditingArea/>
</template>

<style lang="scss">
:root {
  --bg-color-1: rgba(51, 51, 51, 1);
  --bg-color-2: rgba(37, 37, 38, 1);
  --bg-color-3: rgba(30, 30, 30, 1);
  --color-1: rgba(255, 255, 255, 0.4);
  --color-2: rgba(187, 187, 187, 1);
  --color-3: rgba(204, 204, 204, 1);
  --color-4: rgba(255, 255, 255, 1);
}
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &.mac {
    font-family: -apple-system,BlinkMacSystemFont,sans-serif;
  }
  &.windows {
    font-family: Segoe WPC,Segoe UI,Microsoft YaHei,sans-serif;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-color-1);
  color: var(--color-1);
}
</style>
