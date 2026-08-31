<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import SIcon from '@/components/base/SIcon.vue'

defineProps<{
  post: BlogPost
  wordCount: number
}>()
</script>

<template>
  <div class="rounded-2xl glass p-6">
    <div class="flex items-center gap-2 mb-4">
      <SIcon name="Shield" :size="18" class="text-primary" />
      <h3 class="text-sm font-bold text-ink">版权声明</h3>
    </div>

    <div class="space-y-2 text-sm text-ink-muted">
      <p>
        <span class="text-ink font-medium">本文作者：</span>{{ post.author || 'QiuMonster' }}
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
      <div class="border-t border-line pt-3 mt-3">
        <p>本文采用 <span class="text-primary font-medium">CC BY-NC-SA 4.0</span> 协议进行许可。转载请注明出处。</p>
      </div>
      <p class="text-xs text-ink-faint mt-2">
        © {{ post.date.slice(0, 4) }} Somoe Home. All rights reserved.
      </p>
    </div>
  </div>
</template>
