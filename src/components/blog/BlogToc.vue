<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import SIcon from '@/components/base/SIcon.vue'

interface TocItem {
  id: string
  text: string
  level: number
}

const props = defineProps<{ container: string }>()
const { blog } = useConfig()

const headings = ref<TocItem[]>([])
const activeId = ref('')
const manualActive = ref(false)
let manualTimer: ReturnType<typeof setTimeout> | null = null

function collectHeadings() {
  const el = document.querySelector(props.container)
  if (!el) return false
  const hList = el.querySelectorAll('h2, h3, h4')
  if (!hList.length) return false
  headings.value = Array.from(hList).map((h) => {
    if (!h.id) h.id = h.textContent?.trim().replace(/\s+/g, '-').toLowerCase() || `heading-${Math.random().toString(36).slice(2, 8)}`
    return { id: h.id, text: h.textContent?.trim() || '', level: Number(h.tagName.slice(1)) }
  })
  return true
}

let observer: IntersectionObserver | null = null
let mutationObserver: MutationObserver | null = null

function setupObserver() {
  if (observer) observer.disconnect()
  if (!headings.value.length) return
  observer = new IntersectionObserver(
    (entries) => {
      if (manualActive.value) return
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: `-${blog.tocOffset}px 0px -60% 0px` },
  )
  for (const h of headings.value) {
    const el = document.getElementById(h.id)
    if (el) observer!.observe(el)
  }
}

function tryInit() {
  if (collectHeadings()) {
    setupObserver()
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }
  }
}

function startWatching() {
  const el = document.querySelector(props.container)
  if (!el) return
  mutationObserver = new MutationObserver(() => {
    if (!headings.value.length) tryInit()
  })
  mutationObserver.observe(el, { childList: true, subtree: true })
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - blog.tocOffset
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
  manualActive.value = true
  if (manualTimer) clearTimeout(manualTimer)
  manualTimer = setTimeout(() => {
    manualActive.value = false
  }, 1000)
}

onMounted(() => {
  tryInit()
  startWatching()
})

onUnmounted(() => {
  observer?.disconnect()
  mutationObserver?.disconnect()
  if (manualTimer) clearTimeout(manualTimer)
})
</script>

<template>
  <nav v-if="headings.length" class="toc-wrapper">
    <div class="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
      <SIcon name="List" :size="16" class="text-primary" />
      目录
    </div>
    <ul class="space-y-1">
      <li
        v-for="h in headings"
        :key="h.id"
        class="transition-all duration-200"
        :style="{ paddingLeft: `${(h.level - 2) * 12 + 4}px` }"
      >
        <a
          href="javascript:void(0)"
          class="block truncate rounded py-1 px-2 text-xs leading-relaxed transition-colors duration-200"
          :class="activeId === h.id
            ? 'font-bold text-primary bg-primary/10'
            : 'text-ink-muted hover:text-primary hover:bg-primary/5'"
          @click="scrollTo(h.id)"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-wrapper {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
