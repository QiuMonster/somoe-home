<script setup lang="ts">
import type { BlogNavInfo } from '@/types/blog'
import SIcon from '@/components/base/SIcon.vue'

defineProps<{
  nav: BlogNavInfo
}>()
</script>

<template>
  <nav class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <router-link
      v-if="nav.prev"
      :to="`/blog/${nav.prev.slug}`"
      class="group flex items-center gap-3 rounded-xl glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float"
    >
      <SIcon name="ChevronLeft" :size="20" class="shrink-0 text-ink-faint transition-colors group-hover:text-primary" />
      <div class="min-w-0">
        <span class="text-xs text-ink-faint">上一篇</span>
        <p class="text-sm font-bold text-ink truncate transition-colors group-hover:text-primary">{{ nav.prev.title }}</p>
      </div>
    </router-link>
    <div v-else class="hidden sm:block" />

    <router-link
      v-if="nav.next"
      :to="`/blog/${nav.next.slug}`"
      class="group flex items-center justify-end gap-3 rounded-xl glass p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float"
    >
      <div class="min-w-0">
        <span class="text-xs text-ink-faint">下一篇</span>
        <p class="text-sm font-bold text-ink truncate transition-colors group-hover:text-primary">{{ nav.next.title }}</p>
      </div>
      <SIcon name="ChevronRight" :size="20" class="shrink-0 text-ink-faint transition-colors group-hover:text-primary" />
    </router-link>
    <div v-else class="hidden sm:block" />
  </nav>
</template>
