<script setup lang="ts">
import { computed } from 'vue'
import { useBlog } from '@/hooks/useBlog'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { blogConfig } from '@/config/blog.config'
import SIcon from '@/components/base/SIcon.vue'
import type { BlogPost, BlogArchive } from '@/types/blog'

const { archives } = useBlog()

const yearColors = [
  'bg-rose-500/15 text-rose-500',
  'bg-sky-500/15 text-sky-500',
  'bg-amber-500/15 text-amber-500',
  'bg-emerald-500/15 text-emerald-500',
  'bg-violet-500/15 text-violet-500',
  'bg-cyan-500/15 text-cyan-500',
  'bg-pink-500/15 text-pink-500',
  'bg-teal-500/15 text-teal-500',
]

function yearColor(year: string): string {
  return yearColors[parseInt(year) % yearColors.length]
}

const hoverColors = [
  'hover:bg-rose-500/10',
  'hover:bg-sky-500/10',
  'hover:bg-amber-500/10',
  'hover:bg-emerald-500/10',
  'hover:bg-violet-500/10',
  'hover:bg-cyan-500/10',
  'hover:bg-pink-500/10',
  'hover:bg-teal-500/10',
]

const hoverTextColors = [
  'group-hover:text-rose-500',
  'group-hover:text-sky-500',
  'group-hover:text-amber-500',
  'group-hover:text-emerald-500',
  'group-hover:text-violet-500',
  'group-hover:text-cyan-500',
  'group-hover:text-pink-500',
  'group-hover:text-teal-500',
]

const postColorIndex = computed(() => {
  const map = new Map<string, number>()
  let i = 0
  for (const a of displayedArchives.value) {
    for (const m of a.months) {
      for (const p of m.posts) {
        map.set(p.slug, i++)
      }
    }
  }
  return map
})

function postHoverClass(slug: string): string {
  if (!blogConfig.archiveColorHover) return 'hover:bg-primary/5'
  return hoverColors[(postColorIndex.value.get(slug) ?? 0) % hoverColors.length]
}

function postHoverTextClass(slug: string): string {
  if (!blogConfig.archiveColorHover) return 'group-hover:text-primary'
  return hoverTextColors[(postColorIndex.value.get(slug) ?? 0) % hoverTextColors.length]
}

const allPosts = computed(() => {
  const posts: BlogPost[] = []
  for (const a of archives.value) {
    for (const m of a.months) {
      for (const p of m.posts) {
        posts.push(p)
      }
    }
  }
  return posts
})

const { displayed, hasMore, sentinel } = useInfiniteScroll(allPosts, 10)

const displayedArchives = computed<BlogArchive[]>(() => {
  const map = new Map<string, Map<string, BlogPost[]>>()
  for (const p of displayed.value) {
    const year = p.date.slice(0, 4)
    const month = p.date.slice(5, 7)
    if (!map.has(year)) map.set(year, new Map())
    const yearMap = map.get(year)!
    if (!yearMap.has(month)) yearMap.set(month, [])
    yearMap.get(month)!.push(p)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries())
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([month, mPosts]) => ({ month, posts: mPosts })),
    }))
})
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-28 pb-16 sm:pt-40">
      <div class="container px-4">
        <div class="mx-auto max-w-4xl">
          <div class="mb-10 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <SIcon name="Archive" :size="20" />
            </span>
            <div>
              <h1 class="text-2xl font-bold text-ink sm:text-3xl">归档</h1>
              <p class="text-base font-medium text-ink-muted">按时间线浏览博客文章</p>
            </div>
          </div>

          <div class="space-y-10">
            <div v-for="archive in displayedArchives" :key="archive.year">
              <div class="mb-4 flex items-center gap-3">
                <span
                  class="flex h-11 w-11 items-center justify-center rounded-full text-base font-bold transition-transform duration-500 hover:scale-110"
                  :class="yearColor(archive.year)"
                >
                  {{ archive.year.slice(2) }}
                </span>
                <h2 class="text-xl font-bold text-ink">{{ archive.year }}</h2>
                <span class="text-sm text-ink-faint">
                  {{ archive.months.reduce((s, m) => s + m.posts.length, 0) }} 篇
                </span>
              </div>

              <div v-for="monthGroup in archive.months" :key="monthGroup.month" class="ml-[1.25rem] border-l-2 border-primary/20 pl-5">
                <h3 class="mb-3 text-sm font-bold text-primary">{{ monthGroup.month }} 月</h3>
                <div class="space-y-3">
                  <router-link
                    v-for="post in monthGroup.posts"
                    :key="post.slug"
                    :to="`/blog/${post.slug}`"
                    class="group flex items-start gap-3 rounded-lg p-2 transition-all duration-200"
                    :class="postHoverClass(post.slug)"
                  >
                    <SIcon name="FileText" :size="16" class="mt-1 shrink-0 text-ink-faint transition-colors" :class="postHoverTextClass(post.slug)" />
                    <div class="min-w-0">
                      <h4 class="text-base font-bold text-ink transition-colors truncate" :class="postHoverTextClass(post.slug)">{{ post.title }}</h4>
                      <p v-if="blogConfig.archiveShowDesc" class="mt-1 text-sm leading-relaxed text-ink-muted line-clamp-2">{{ post.description }}</p>
                      <p class="text-sm text-ink-faint mt-1">{{ post.date }}</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div v-if="hasMore" :ref="(el) => { if (el) sentinel = el as Element }" class="py-8 text-center text-sm text-ink-faint">
            <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-ink-faint border-t-transparent align-middle" />
            <span class="ml-2">加载更多…</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
