<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import SIcon from './SIcon.vue'

// 主题切换通用组件：日月图标，平滑过渡由全局 CSS 处理
const props = withDefaults(
  defineProps<{ size?: number | string; label?: boolean }>(),
  { size: 20, label: false },
)

const { resolved, toggle } = useTheme()
const iconName = computed(() => (resolved.value === 'dark' ? 'Moon' : 'Sun'))
</script>

<template>
  <button
    type="button"
    class="group flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary"
    :aria-label="resolved === 'dark' ? '切换到亮色' : '切换到暗色'"
    @click="toggle"
  >
    <SIcon
      :name="iconName"
      :size="size"
      class="transition-transform duration-500 group-hover:rotate-12"
    />
    <span v-if="label" class="text-sm font-medium">
      {{ resolved === 'dark' ? '暗色' : '亮色' }}
    </span>
  </button>
</template>
