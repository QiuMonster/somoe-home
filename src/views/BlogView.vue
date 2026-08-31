<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '@/hooks/useBlog'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { usePagination } from '@/hooks/usePagination'
import { useConfig } from '@/hooks/useConfig'
import BlogCard from '@/components/blog/BlogCard.vue'
import CategoryBadge from '@/components/blog/CategoryBadge.vue'
import SIcon from '@/components/base/SIcon.vue'

const route = useRoute()
const { posts, categories, getPostsByCategory } = useBlog()
const { blog } = useConfig()

const selectedCategory = ref('')

onMounted(() => {
  const cat = route.query.category as string
  if (cat) selectedCategory.value = cat
})

watch(() => route.query.category, (cat) => {
  selectedCategory.value = (cat as string) || ''
})

const filteredPosts = computed(() => {
  let result = posts.value
  if (selectedCategory.value) {
    result = getPostsByCategory(selectedCategory.value)
  }
  return result
})

const isScrollMode = computed(() => blog.loadMode === 'scroll')

const scrollMode = useInfiniteScroll(filteredPosts, blog.pageSize)
const paginationMode = usePagination(filteredPosts, blog.pageSize)

const displayed = computed(() => isScrollMode.value ? scrollMode.displayed.value : paginationMode.displayed.value)
const hasMore = computed(() => isScrollMode.value ? scrollMode.hasMore.value : paginationMode.hasNext.value)
const sentinel = scrollMode.sentinel

const cols = computed(() => blog.columns)

const containerClass = computed(() => {
  const c = cols.value
  if (c === 1) return 'mx-auto max-w-2xl'
  if (c === 2) return 'mx-auto max-w-4xl'
  if (c === 3) return 'mx-auto max-w-6xl'
  return 'mx-auto max-w-7xl'
})

const gridClass = computed(() => {
  const c = cols.value
  if (c === 1) return 'grid grid-cols-1 gap-5'
  if (c === 2) return 'grid grid-cols-1 gap-5 sm:grid-cols-2'
  if (c === 3) return 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
  return 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
})

const pages = computed(() => {
  const t = paginationMode.total.value
  return Array.from({ length: t }, (_, i) => i + 1)
})

const paginationWiggleClass = computed(() => blog.paginationWiggle ? 'hover:animate-wiggle' : '')
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-28 pb-16 sm:pt-40">
      <div class="container px-4">
        <div :class="containerClass">
          <div class="mb-10 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <SIcon name="BookOpen" :size="20" />
            </span>
            <div>
              <h1 class="text-2xl font-bold text-ink sm:text-3xl">博客</h1>
              <p class="text-base font-medium text-ink-muted">记录思考，分享发现</p>
            </div>
          </div>

          <div class="mb-8 flex flex-wrap gap-2">
            <CategoryBadge
              name="全部"
              :count="posts.length"
              :active="!selectedCategory"
              :index="0"
              :wiggle="blog.categoryWiggle"
              @click="selectedCategory = ''"
            />
            <CategoryBadge
              v-for="(cat, i) in categories"
              :key="cat.name"
              :name="cat.name"
              :count="cat.count"
              :active="selectedCategory === cat.name"
              :index="i + 1"
              :wiggle="blog.categoryWiggle"
              @click="selectedCategory = selectedCategory === cat.name ? '' : cat.name"
            />
          </div>

          <div v-if="displayed.length" :class="gridClass">
            <BlogCard
              v-for="(post, i) in displayed"
              :key="post.slug"
              :post="post"
              :index="i"
            />
          </div>

          <div v-else class="py-20 text-center text-ink-faint">
            <SIcon name="BookOpen" :size="40" class="mx-auto mb-4 opacity-50" />
            <p>暂无博客</p>
          </div>

          <!-- 滚动加载提示 -->
          <div v-if="isScrollMode && hasMore" :ref="(el) => { if (el) sentinel = el as Element }" class="py-8 text-center text-sm text-ink-faint">
            <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-ink-faint border-t-transparent align-middle" />
            <span class="ml-2">加载更多…</span>
          </div>

          <!-- 分页导航 -->
          <div v-if="!isScrollMode && paginationMode.total.value > 1" class="mt-8 flex items-center justify-center gap-2 flex-wrap">
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              :class="[paginationWiggleClass, paginationMode.hasPrev.value
                ? 'bg-sky-500/10 border-sky-500/20 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-sky-500/25 hover:ring-2 hover:ring-sky-300/50'
                : 'bg-sky-500/5 border-sky-500/10 text-sky-500/30']"
              :disabled="!paginationMode.hasPrev.value"
              @click="paginationMode.prev()"
            >
              <SIcon name="ChevronLeft" :size="16" />
              上一页
            </button>

            <button
              v-for="p in pages"
              :key="p"
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              :class="[paginationWiggleClass, p === paginationMode.current.value
                ? 'bg-violet-500 border-violet-500 text-white dark:bg-violet-400 dark:border-violet-400 shadow-lg'
                : 'bg-violet-500/10 border-violet-500/20 text-violet-500 dark:bg-violet-400/15 dark:border-violet-400/25 dark:text-violet-400 hover:bg-violet-500 hover:text-white hover:border-violet-500 dark:hover:bg-violet-400 dark:hover:border-violet-400 hover:shadow-violet-500/25 dark:hover:shadow-violet-400/25 hover:ring-2 hover:ring-violet-300/50 dark:hover:ring-violet-300/40']"
              @click="paginationMode.go(p)"
            >
              {{ p }}
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              :class="[paginationWiggleClass, paginationMode.hasNext.value
                ? 'bg-sky-500/10 border-sky-500/20 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-sky-500/25 hover:ring-2 hover:ring-sky-300/50'
                : 'bg-sky-500/5 border-sky-500/10 text-sky-500/30']"
              :disabled="!paginationMode.hasNext.value"
              @click="paginationMode.next()"
            >
              下一页
              <SIcon name="ChevronRight" :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
