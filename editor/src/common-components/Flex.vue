<script lang="ts" setup>
import { computed } from "vue"
interface Props {
  tag?: string
  type?: 'flex' | 'inline-flex'
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alignItems?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flex?: string
  fixHeight?: boolean
  fixWidth?: boolean
  gap?: string
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  type: 'flex',
  direction: 'row',
  wrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'normal'
})
const height = computed(() => props.fixHeight ? 0 : 'auto')
const width = computed(() => props.fixWidth ? 0 : 'auto')
</script>

<template>
  <component :is="tag" class="flex">
    <slot/>
  </component>
</template>

<style lang="scss" scoped>
.flex {
  flex: v-bind(flex);
  display: v-bind(type);
  flex-direction: v-bind(direction);
  flex-wrap: v-bind(wrap);
  justify-content: v-bind(justifyContent);
  align-items: v-bind(alignItems);
  height: v-bind(height);
  width: v-bind(width);
  gap: v-bind(gap);
}
</style>