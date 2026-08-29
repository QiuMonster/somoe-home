<script setup lang="ts">
import { computed } from 'vue'

// 全局过渡动画组件：fade-up / fade / scale 三套预设
// 用法：<STransition name="fade-up"><div v-if="show">…</div></STransition>
const props = withDefaults(
  defineProps<{
    name?: 'fade-up' | 'fade' | 'scale'
    appear?: boolean
  }>(),
  {
    name: 'fade-up',
    appear: true,
  },
)

const presets = {
  'fade-up': {
    enterActive: 'transition-all duration-700 ease-liquid',
    enterFrom: 'opacity-0 translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leaveActive: 'transition-all duration-300 ease-liquid',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-2',
  },
  fade: {
    enterActive: 'transition-opacity duration-500 ease-liquid',
    enterFrom: 'opacity-0',
    leaveActive: 'transition-opacity duration-300 ease-liquid',
    leaveTo: 'opacity-0',
  },
  scale: {
    enterActive: 'transition-all duration-500 ease-liquid',
    enterFrom: 'opacity-0 scale-95',
    leaveActive: 'transition-all duration-300 ease-liquid',
    leaveTo: 'opacity-0 scale-95',
  },
} as const

const p = computed(() => presets[props.name])
</script>

<template>
  <Transition
    :appear="appear"
    :enter-active-class="p.enterActive"
    :enter-from-class="p.enterFrom"
    :leave-active-class="p.leaveActive"
    :leave-to-class="p.leaveTo"
  >
    <slot />
  </Transition>
</template>
