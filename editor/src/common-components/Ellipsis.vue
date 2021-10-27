<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  line?: number
  tag?: string
}
const props = withDefaults(defineProps<Props>(), {
  line: 1,
  tag: 'span'
})
const className = computed(() => props.line > 1 ? 'multiple' : 'single')
</script>

<template>
  <component :is="tag" :class="['ellipsis', className]">
    <slot/>
  </component>
</template>

<style lang="scss" scoped>
.ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  &.single {
    width: 100%;
    white-space: nowrap;
    vertical-align: bottom;
  }
  &.multiple {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: v-bind(line);
  }
}
</style>