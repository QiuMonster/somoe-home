<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBlog } from '@/hooks/useBlog'
import SIcon from '@/components/base/SIcon.vue'

const router = useRouter()
const { categories } = useBlog()

function goCategory(name: string) {
  router.push({ path: '/blog', query: { category: name } })
}

const palette = [
  { bg: 'bg-rose-50 dark:bg-rose-950/30', dot: 'bg-rose-300/40 dark:bg-rose-400/20', icon: 'from-rose-400 to-rose-500', text: 'text-rose-600 dark:text-rose-300', badge: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' },
  { bg: 'bg-violet-50 dark:bg-violet-950/30', dot: 'bg-violet-300/40 dark:bg-violet-400/20', icon: 'from-violet-400 to-violet-500', text: 'text-violet-600 dark:text-violet-300', badge: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300' },
  { bg: 'bg-sky-50 dark:bg-sky-950/30', dot: 'bg-sky-300/40 dark:bg-sky-400/20', icon: 'from-sky-400 to-sky-500', text: 'text-sky-600 dark:text-sky-300', badge: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' },
  { bg: 'bg-amber-50 dark:bg-amber-950/30', dot: 'bg-amber-300/40 dark:bg-amber-400/20', icon: 'from-amber-400 to-amber-500', text: 'text-amber-600 dark:text-amber-300', badge: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' },
  { bg: 'bg-emerald-50 dark:bg-emerald-950/30', dot: 'bg-emerald-300/40 dark:bg-emerald-400/20', icon: 'from-emerald-400 to-emerald-500', text: 'text-emerald-600 dark:text-emerald-300', badge: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30', dot: 'bg-fuchsia-300/40 dark:bg-fuchsia-400/20', icon: 'from-fuchsia-400 to-fuchsia-500', text: 'text-fuchsia-600 dark:text-fuchsia-300', badge: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/40 dark:text-fuchsia-300' },
  { bg: 'bg-orange-50 dark:bg-orange-950/30', dot: 'bg-orange-300/40 dark:bg-orange-400/20', icon: 'from-orange-400 to-orange-500', text: 'text-orange-600 dark:text-orange-300', badge: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300' },
  { bg: 'bg-teal-50 dark:bg-teal-950/30', dot: 'bg-teal-300/40 dark:bg-teal-400/20', icon: 'from-teal-400 to-teal-500', text: 'text-teal-600 dark:text-teal-300', badge: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300' },
  { bg: 'bg-indigo-50 dark:bg-indigo-950/30', dot: 'bg-indigo-300/40 dark:bg-indigo-400/20', icon: 'from-indigo-400 to-indigo-500', text: 'text-indigo-600 dark:text-indigo-300', badge: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { bg: 'bg-cyan-50 dark:bg-cyan-950/30', dot: 'bg-cyan-300/40 dark:bg-cyan-400/20', icon: 'from-cyan-400 to-cyan-500', text: 'text-cyan-600 dark:text-cyan-300', badge: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300' },
]

function getColor(index: number) {
  return palette[index % palette.length]
}
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-28 pb-16 sm:pt-40">
      <div class="container px-4">
        <div class="mx-auto max-w-4xl">
          <div class="mb-10 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <SIcon name="FolderOpen" :size="20" />
            </span>
            <div>
              <h1 class="text-2xl font-bold text-ink sm:text-3xl">分类</h1>
              <p class="text-base font-medium text-ink-muted">按类别浏览博客文章</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              v-for="(cat, idx) in categories"
              :key="cat.name"
              type="button"
              class="group relative overflow-hidden rounded-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
              :class="getColor(idx).bg"
              @click="goCategory(cat.name)"
            >
              <!-- 波点装饰 -->
              <span class="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full opacity-60" :class="getColor(idx).dot" />
              <span class="pointer-events-none absolute right-8 top-10 h-6 w-6 rounded-full opacity-40" :class="getColor(idx).dot" />
              <span class="pointer-events-none absolute -bottom-2 -left-2 h-10 w-10 rounded-full opacity-30" :class="getColor(idx).dot" />
              <span class="pointer-events-none absolute bottom-6 left-8 h-4 w-4 rounded-full opacity-20" :class="getColor(idx).dot" />

              <div class="relative flex items-center gap-4">
                <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-soft transition-transform duration-500 group-hover:scale-110" :class="getColor(idx).icon">
                  <SIcon name="FolderOpen" :size="20" />
                </span>
                <div class="min-w-0 flex-1">
                  <h3 class="text-base font-bold transition-colors" :class="[getColor(idx).text, 'group-hover:brightness-110']">{{ cat.name }}</h3>
                  <span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="getColor(idx).badge">{{ cat.count }} 篇文章</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
