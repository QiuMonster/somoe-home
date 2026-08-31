<script setup lang="ts">
import { onMounted, ref } from 'vue'
import JSON5 from 'json5'
import SIcon from '@/components/base/SIcon.vue'
import { profileConfig } from '@/config/profile.config'

interface FriendLink {
  name: string
  url: string
  avatar: string
  description: string
  bg: string
  rss?: string
  rssMode?: string
}

const friends = ref<FriendLink[]>([])
const loading = ref(true)
const error = ref('')

function resolveUrl(base: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  try {
    return new URL(path, base).href
  } catch {
    return path
  }
}

onMounted(async () => {
  try {
    const res = await fetch('/data/friends.json5')
    if (!res.ok) throw new Error(`请求失败: ${res.status}`)
    const text = await res.text()
    const baseUrl = 'https://blog.somoe.xyz/'
    const raw: FriendLink[] = JSON5.parse(text)
    friends.value = raw.map((f) => ({
      ...f,
      avatar: resolveUrl(baseUrl, f.avatar),
      bg: resolveUrl(baseUrl, f.bg),
    }))
  } catch (e) {
    error.value = (e as Error).message || '加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pt-28 pb-16 sm:pt-40">
      <div class="container px-4">
        <div class="mx-auto max-w-6xl">
          <div class="mb-10 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <SIcon name="Link" :size="20" />
            </span>
            <div>
              <h1 class="text-2xl font-bold text-ink sm:text-3xl">友情链接</h1>
              <p class="text-base font-medium text-ink-muted">在海面上相遇，便是同行之人</p>
            </div>
          </div>

          <!-- 交换友链说明 -->
          <div class="mb-12 rounded-2xl glass p-6">
            <h2 class="mb-3 flex items-center gap-2 text-lg font-semibold text-ink">
              <SIcon name="PenTool" :size="18" class="text-primary" />
              交换友链
            </h2>
            <p class="text-sm leading-relaxed text-ink-muted">
              如果你想与本站交换友链，请通过邮件联系我，附上你的站点名称、地址、头像和简介。
            </p>
            <a
              href="mailto:qiumonster@163.com"
              class="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5"
            >
              <SIcon name="Mail" :size="16" />
              发送邮件
            </a>

            <div class="mt-5 border-t border-line pt-4">
              <h3 class="mb-2 text-sm font-semibold text-ink">本站信息</h3>
              <div class="grid grid-cols-1 gap-2 text-sm text-ink-muted sm:grid-cols-2">
                <div><span class="text-ink">站点名称：</span>{{ profileConfig.siteProfile?.name }}</div>
                <div><span class="text-ink">站点地址：</span>{{ profileConfig.siteProfile?.url }}</div>
                <div><span class="text-ink">站点头像：</span>{{ profileConfig.siteProfile?.avatar }}</div>
                <div><span class="text-ink">站点描述：</span>{{ profileConfig.siteProfile?.description }}</div>
                <div v-if="profileConfig.siteProfile?.rss"><span class="text-ink">RSS订阅：</span>{{ profileConfig.siteProfile.rss }}</div>
                <div v-if="profileConfig.siteProfile?.bg"><span class="text-ink">站点背景：</span>{{ profileConfig.siteProfile.bg }}</div>
              </div>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="py-20 text-center">
            <span class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-ink-faint border-t-transparent" />
            <p class="mt-3 text-sm text-ink-faint">加载中…</p>
          </div>

          <!-- 错误状态 -->
          <div v-else-if="error" class="py-20 text-center text-ink-faint">
            <SIcon name="X" :size="40" class="mx-auto mb-4 opacity-50" />
            <p>加载失败: {{ error }}</p>
          </div>

          <!-- 友链卡片网格 -->
          <div
            v-else-if="friends.length"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <a
              v-for="friend in friends"
              :key="friend.name"
              :href="friend.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-float"
            >
              <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg ring-2 ring-line">
                <img
                  :src="friend.avatar"
                  :alt="friend.name"
                  loading="lazy"
                  class="h-full w-full object-cover"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="truncate text-base font-bold text-ink transition-colors group-hover:text-primary">{{ friend.name }}</h3>
                <p class="mt-1 line-clamp-2 text-sm text-ink-muted">{{ friend.description }}</p>
              </div>
            </a>
          </div>

          <!-- 空状态 -->
          <div v-else class="py-20 text-center text-ink-faint">
            <SIcon name="Link" :size="40" class="mx-auto mb-4 opacity-50" />
            <p>暂无友链</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
