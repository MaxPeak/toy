<script lang="ts" setup>
import { computed } from "vue"
interface Props {
  icon: string
  svg?: boolean
}
const props = defineProps<Props>()
const type = computed(() => `${props.svg ? '#icon' : 'seti' }-${props.icon}`)
const mountResource = () => {
  // https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2894262
  if(!props.svg || document.head.querySelector('[data-nickname=iconfont]')) return
  const script = document.createElement('script')
  script.src = '//at.alicdn.com/t/font_2894262_5keik7i7x8n.js'
  script.defer = true
  script.dataset.nickname = 'iconfont'
  document.head.appendChild(script)
}
mountResource()
</script>

<template>
  <svg v-if="svg" class="icon" aria-hidden="true">
    <use :xlink:href="type" />
  </svg>
  <i v-else :class="type"/>
</template>

<style lang="scss" scoped>
@import url('./seti.css');
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>