<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { emitter } from '@/utils'
import { Configuration } from './CompositeBar.vue'
const visible = ref(true)
emitter.on('visible', () => {
  visible.value = !visible.value
})

const config = ref<Configuration | null>()
emitter.on('change', value => {
  visible.value = true
  config.value = value
})
</script>

<template>
  <aside v-if="visible" class="sidebar">
    <Flex class="header" justify-content="space-between">
      <Ellipsis tag="div" class="title" :title="config?.title">{{ config?.title }}</Ellipsis>
      <Flex class="actions" flex="1" justify-content="flex-end" gap="10px">
        <Icon v-for="action in config?.actions" :key="action.icon" :icon="action.icon" svg/>
      </Flex>
    </Flex>
    <div class="content">{{ config?.componentName }}</div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 350px;
  padding: 0 20px;
  background-color: var(--bg-color-2);
  .header {
    padding: 10px 0;
    color: var(--color-2);
    font-size: 14px;
    .actions {
      padding-left: 10px;
    }
  }
}
</style>