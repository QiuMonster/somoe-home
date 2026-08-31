<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import type { SiteItem } from '@/types/config'
import { useGsapAnim } from '@/hooks/useGsapAnim'
import SIcon from './SIcon.vue'

// 通用站点卡片组件（纯 props 驱动，自带 GSAP hover 动效、磨砂样式）
const props = withDefaults(
  defineProps<{
    item: SiteItem
    pinned?: boolean
    intensity?: number
    index?: number
  }>(),
  {
    pinned: false,
    intensity: 0.5,
    index: 0,
  },
)

const iconColors = [
  'bg-rose-500/15 text-rose-500',
  'bg-sky-500/15 text-sky-500',
  'bg-amber-500/15 text-amber-500',
  'bg-emerald-500/15 text-emerald-500',
  'bg-violet-500/15 text-violet-500',
  'bg-cyan-500/15 text-cyan-500',
  'bg-pink-500/15 text-pink-500',
  'bg-teal-500/15 text-teal-500',
]

function iconClass(i: number): string {
  return iconColors[i % iconColors.length]
}

const emit = defineEmits<{
  pin: [id: string]
}>()

const { bindCardHover } = useGsapAnim()
const rootEl = ref<HTMLElement | null>(null)
let cleanup: { onEnter: () => void; onMove: (e: MouseEvent) => void; onLeave: () => void } | null = null

onMounted(() => {
  if (rootEl.value) cleanup = bindCardHover(rootEl.value, props.intensity)
})
onUnmounted(() => {
  if (rootEl.value) gsap.killTweensOf(rootEl.value)
  cleanup = null
})

function handlePin(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  emit('pin', props.item.id)
}
</script>

<template>
  <a
    ref="rootEl"
    :href="item.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative flex flex-col gap-4 rounded-xl glass p-5 transition-shadow duration-300 will-change-transform"
    style="transform-style: preserve-3d"
  >
    <!-- 边框渐变微光（hover 流动） -->
    <span
      class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style="
        background: linear-gradient(135deg, rgb(var(--color-primary) / 0.5), rgb(var(--color-secondary) / 0.5));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        padding: 1px;
      "
    />

    <div class="flex items-start justify-between">
      <span
        class="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
        :class="iconClass(index)"
      >
        <SIcon :name="item.icon" :size="20" />
      </span>

      <button
        type="button"
        class="rounded-full p-2 text-ink-faint transition-colors duration-300 hover:text-accent"
        :aria-label="pinned ? '取消置顶' : '置顶'"
        @click="handlePin"
      >
        <SIcon :name="pinned ? 'Pin' : 'PinOff'" :size="16" />
      </button>
    </div>

    <div class="flex-1">
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-ink">{{ item.title }}</h3>
        <SIcon
          name="ExternalLink"
          :size="13"
          class="text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <p class="mt-1 text-sm font-medium leading-relaxed text-ink-muted">{{ item.description }}</p>
    </div>
  </a>
</template>
