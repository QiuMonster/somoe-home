<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlog } from '@/hooks/useBlog'
import SIcon from '@/components/base/SIcon.vue'
import JSON5 from 'json5'

interface FriendLink {
  name: string
  url: string
  avatar: string
  description: string
}

const route = useRoute()
const router = useRouter()
const { posts } = useBlog()

const query = ref('')
const friends = ref<FriendLink[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  const q = route.query.q as string
  if (q) query.value = q
  fetchFriends()
  nextTick(() => inputRef.value?.focus())
})

watch(() => route.query.q, (q) => {
  if (typeof q === 'string') query.value = q
  nextTick(() => inputRef.value?.focus())
})

async function fetchFriends() {
  try {
    const res = await fetch('/data/friends.json5')
    if (!res.ok) return
    const text = await res.text()
    const baseUrl = 'https://blog.somoe.xyz/'
    const raw: FriendLink[] = JSON5.parse(text)
    friends.value = raw.map((f) => ({
      ...f,
      avatar: f.avatar.startsWith('http') ? f.avatar : new URL(f.avatar, baseUrl).href,
    }))
  } catch {
    /* ignore */
  }
}

function onSearch() {
  const q = query.value.trim()
  if (q) {
    router.replace({ path: '/search', query: { q } })
  }
}

const blogResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return posts.value.filter((p) =>
    [p.title, p.description, ...p.tags, ...p.categories]
      .join(' ')
      .toLowerCase()
      .includes(q)
  )
})

const friendResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return friends.value.filter((f) =>
    [f.name, f.description, f.url]
      .join(' ')
      .toLowerCase()
      .includes(q)
  )
})

const hasResults = computed(() => blogResults.value.length > 0 || friendResults.value.length > 0)
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-28 pb-16 sm:pt-40">
      <div class="container px-4">
        <div class="mx-auto max-w-3xl">
          <div class="mb-10 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <SIcon name="Search" :size="20" />
            </span>
            <div>
              <h1 class="text-2xl font-bold text-ink sm:text-3xl">搜索</h1>
              <p class="text-base font-medium text-ink-muted">搜索博客文章与友链</p>
            </div>
          </div>

          <div class="mb-8">
            <form class="relative" @submit.prevent="onSearch">
              <SIcon name="Search" :size="18" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="输入关键词搜索…"
                class="w-full rounded-full glass py-3.5 pl-11 pr-10 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                v-if="query"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-faint transition-colors hover:text-primary"
                @click="query = ''"
              >
                <SIcon name="X" :size="16" />
              </button>
            </form>
          </div>

          <template v-if="query.trim()">
            <div v-if="hasResults" class="space-y-8">
              <section v-if="blogResults.length">
                <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                  <SIcon name="BookOpen" :size="18" class="text-amber-500" />
                  博客
                  <span class="text-sm font-normal text-ink-faint">（{{ blogResults.length }} 条结果）</span>
                </h2>
                <div class="space-y-3">
                  <router-link
                    v-for="post in blogResults"
                    :key="post.slug"
                    :to="`/blog/${post.slug}`"
                    class="group flex items-start gap-4 rounded-xl glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float"
                  >
                    <div class="min-w-0 flex-1">
                      <h3 class="text-base font-bold text-ink transition-colors group-hover:text-primary truncate">{{ post.title }}</h3>
                      <p class="mt-1 text-sm text-ink-muted line-clamp-2">{{ post.description }}</p>
                      <div class="mt-2 flex items-center gap-2 text-xs text-ink-faint">
                        <SIcon name="Calendar" :size="12" />
                        <span>{{ post.date }}</span>
                        <span v-if="post.categories.length" class="flex items-center gap-1">
                          <SIcon name="FolderOpen" :size="12" class="ml-1" />
                          <span>{{ post.categories[0] }}</span>
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </section>

              <section v-if="friendResults.length">
                <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                  <SIcon name="Link" :size="18" class="text-rose-500" />
                  友链
                  <span class="text-sm font-normal text-ink-faint">（{{ friendResults.length }} 条结果）</span>
                </h2>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    v-for="friend in friendResults"
                    :key="friend.name"
                    :href="friend.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center gap-3 rounded-xl glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float"
                  >
                    <div class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg ring-2 ring-line">
                      <img
                        :src="friend.avatar"
                        :alt="friend.name"
                        loading="lazy"
                        class="h-full w-full object-cover"
                        @error="($event.target as HTMLImageElement).style.display = 'none'"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="truncate text-sm font-bold text-ink transition-colors group-hover:text-primary">{{ friend.name }}</h3>
                      <p class="mt-0.5 truncate text-xs text-ink-muted">{{ friend.description }}</p>
                    </div>
                  </a>
                </div>
              </section>
            </div>

            <div v-else class="py-20 text-center text-ink-faint">
              <SIcon name="Search" :size="40" class="mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的结果</p>
            </div>
          </template>

          <div v-else class="py-20 text-center text-ink-faint">
            <SIcon name="Search" :size="40" class="mx-auto mb-4 opacity-50" />
            <p>输入关键词开始搜索</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
