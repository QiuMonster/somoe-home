<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '@/hooks/useBlog'
import { useConfig } from '@/hooks/useConfig'
import BlogContent from '@/components/blog/BlogContent.vue'
import BlogCopyright from '@/components/blog/BlogCopyright.vue'
import BlogNav from '@/components/blog/BlogNav.vue'
import BlogToc from '@/components/blog/BlogToc.vue'
import SIcon from '@/components/base/SIcon.vue'

const route = useRoute()
const { posts, getPostBySlug, getNavInfo, countWords } = useBlog()
const { blog } = useConfig()

const slug = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s.join('/') : (s as string)
})
const post = computed(() => getPostBySlug(slug.value))
const nav = computed(() => post.value ? getNavInfo(slug.value, posts.value) : { prev: null, next: null })
const wordCount = computed(() => post.value ? countWords(post.value.content) : 0)
const showToc = computed(() => blog.toc)

watch(slug, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div :key="slug" class="relative min-h-screen">
    <div class="pt-16 pb-16 sm:pt-24">
      <div class="container px-4">
        <div v-if="!post" class="mx-auto max-w-3xl py-20 text-center text-ink-faint">
          <SIcon name="FileText" :size="40" class="mx-auto mb-4 opacity-50" />
          <p>文章不存在</p>
          <router-link to="/blog" class="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <SIcon name="ChevronLeft" :size="16" />
            返回博客列表
          </router-link>
        </div>

        <template v-else>
          <div class="mx-auto flex gap-8" :class="showToc ? 'max-w-6xl' : 'max-w-3xl'">
            <div class="min-w-0 flex-1">
              <div class="mb-8">
                <h1 class="text-2xl font-bold text-ink sm:text-3xl mt-4">{{ post.title }}</h1>

                <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-faint">
                  <span class="flex items-center gap-1">
                    <SIcon name="Calendar" :size="14" />
                    {{ post.date }}
                  </span>
                  <span v-if="post.updated" class="flex items-center gap-1">
                    <SIcon name="Clock" :size="14" />
                    更新于 {{ post.updated }}
                  </span>
                  <span class="flex items-center gap-1">
                    <SIcon name="User" :size="14" />
                    {{ post.author || 'QiuMonster' }}
                  </span>
                  <span v-for="cat in post.categories" :key="cat" class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {{ cat }}
                  </span>
                </div>

                <div v-if="post.tags.length" class="mt-3 flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-500"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <BlogContent :content="post.content" />

              <div class="mt-10">
                <BlogCopyright :post="post" :word-count="wordCount" />
              </div>

              <div class="mt-8">
                <BlogNav :nav="nav" />
              </div>
            </div>

            <aside v-if="showToc" class="hidden w-52 shrink-0 lg:block">
              <BlogToc container=".blog-content" />
            </aside>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
