<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import { blogConfig } from '@/config/blog.config'
import SIcon from '@/components/base/SIcon.vue'

defineProps<{
  post: BlogPost
  wordCount: number
}>()

const { copyright } = blogConfig
</script>

<template>
  <div class="rounded-2xl glass p-6">
    <div class="flex items-center gap-2 mb-4">
      <SIcon name="Shield" :size="18" class="text-primary" />
      <h3 class="text-sm font-bold text-ink">版权声明</h3>
    </div>

    <div class="space-y-2 text-sm text-ink-muted">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p>
          <span class="text-ink font-medium">本文作者：</span>{{ post.author || copyright.author }}
        </p>
        <p>
          <span class="text-ink font-medium">发布日期：</span>{{ post.date }}
        </p>
        <p v-if="post.updated">
          <span class="text-ink font-medium">更新日期：</span>{{ post.updated }}
        </p>
        <p>
          <span class="text-ink font-medium">字数统计：</span>约 {{ wordCount }} 字
        </p>
      </div>

      <div class="border-t border-line pt-3 mt-3 space-y-2">
        <p>本文采用 <a :href="copyright.licenseUrl" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">{{ copyright.license }}</a> 协议进行许可。</p>
        <div v-if="copyright.notices.length" class="flex flex-wrap gap-x-3 gap-y-1 text-ink-faint">
          <span v-for="notice in copyright.notices" :key="notice" class="flex items-center gap-1">
            <span class="inline-block h-1 w-1 rounded-full bg-primary/50" />
            {{ notice }}
          </span>
        </div>
      </div>

      <p class="text-xs text-ink-faint mt-2">
        © {{ post.date.slice(0, 4) }} {{ copyright.siteName }}・{{ copyright.author }}. All rights reserved.
      </p>
    </div>
  </div>
</template>
