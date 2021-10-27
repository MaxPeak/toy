<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { emitter } from '@/utils'

export type Configuration = {
  title: string
  actions: Action[]
  componentName: string
}
type Action = {
  icon: string
  callback: (...args: any[]) => void
  children?: Action[]
}
type NavItem = {
  icon: string
  active: boolean
  config: Configuration
}
const nav = reactive<NavItem[]>([
  {
    icon: 'files',
    active: true,
    config: {
      title: 'EXPLORER',
      actions: [
        { icon: 'add-file', callback: () => {} },
        { icon: 'add-folder', callback: () => {} },
        { icon: 'refresh', callback: () => {} },
        { icon: 'collapse', callback: () => {} },
        { icon: 'more', callback: () => {} }
      ],
      componentName: 'explorer'
    }
  },
  {
    icon: 'search',
    active: false,
    config: {
      title: 'SEARCH',
      actions: [],
      componentName: 'search'
    }
  }
])
let oldItem = nav[0]
onMounted(() => {
  emitter.emit('change', oldItem.config)
})
const toggle = (item: NavItem) => {
  if (oldItem) oldItem.active = false
  item.active = true
  if (oldItem === item) {
    emitter.emit('visible')
  } else {
    emitter.emit('change', item.config)
  }
  oldItem = item
}
</script>

<template>
  <aside class="composite-bar">
    <ul>
      <li v-for="item in nav" :key="item.icon" @click="toggle(item)">
        <Flex tag="a" align-items="center" :class="{ active: item.active }">
          <Icon :icon="item.icon" svg/>
        </Flex>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.composite-bar {
  width: 50px;
  background-color: var(--bg-color-1);
  a {
    position: relative;
    width: 50px;
    height: 50px;
    font-size: 24px;
    color: var(--color-1);
    cursor: pointer;
    &:hover {
      color: var(--color-4);
    }
    &.active {
      color: var(--color-4);
    }
    &.active::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 2px;
      background-color: var(--color-4);
    }
  }
}
</style>