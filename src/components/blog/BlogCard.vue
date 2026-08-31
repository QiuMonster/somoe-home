<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import SIcon from '@/components/base/SIcon.vue'

const props = defineProps<{
  post: BlogPost
  index?: number
}>()

const colors = [
  'bg-sky-500/15 text-sky-500',
  'bg-rose-500/15 text-rose-500',
  'bg-amber-500/15 text-amber-500',
  'bg-emerald-500/15 text-emerald-500',
  'bg-violet-500/15 text-violet-500',
  'bg-cyan-500/15 text-cyan-500',
]

function tagClass(i: number): string {
  return colors[i % colors.length]
}
</script>

<template>
  <router-link
    :to="`/blog/${post.slug}`"
    class="group relative flex flex-col gap-4 rounded-xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
  >
    <div class="flex items-center gap-3 text-xs text-ink-faint">
      <SIcon name="Calendar" :size="14" />
      <span>{{ post.date }}</span>
      <span v-if="post.categories.length" class="flex items-center gap-1">
        <SIcon name="FolderOpen" :size="14" class="ml-1" />
        <span>{{ post.categories[0] }}</span>
      </span>
    </div>

    <h3 class="text-lg font-bold text-ink transition-colors group-hover:text-primary">
      {{ post.title }}
    </h3>

    <p class="text-sm font-medium leading-relaxed text-ink-muted line-clamp-2">
      {{ post.description }}
    </p>

    <div v-if="post.tags.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="(tag, i) in post.tags.slice(0, 3)"
        :key="tag"
        class="rounded-full px-2 py-0.5 text-xs font-medium"
        :class="tagClass(i)"
      >
        {{ tag }}
      </span>
    </div>
  </router-link>
</template>
