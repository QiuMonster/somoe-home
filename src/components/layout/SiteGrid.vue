<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SiteCategory } from '@/types/config'
import { useConfig } from '@/hooks/useConfig'
import SCard from '@/components/base/SCard.vue'
import SIcon from '@/components/base/SIcon.vue'

const { site, isPinned, togglePin, resolvedAnim } = useConfig()

const query = ref('')
const onlyPinned = ref(false)

const filteredCategories = computed<SiteCategory[]>(() => {
  const q = query.value.trim().toLowerCase()
  return site.categories
    .filter((cat) => cat.enabled !== false)
    .map((cat) => {
      let items = cat.items.filter((i) => i.enabled !== false)
      if (onlyPinned.value) items = items.filter((i) => isPinned(i.id))
      if (q) {
        items = items.filter((i) =>
          [i.title, i.description, i.id, ...(i.tags ?? [])]
            .join(' ')
            .toLowerCase()
            .includes(q),
        )
      }
      items = [...items].sort((a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)))
      return { ...cat, items }
    })
    .filter((cat) => cat.items.length > 0)
})
</script>

<template>
  <section class="px-4 py-16">
    <div class="container">
      <!-- 工具条 -->
      <div class="mx-auto mb-8 flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <SIcon
            name="Search"
            :size="18"
            class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            v-model="query"
            type="text"
            placeholder="搜索项目名称、描述或标签…"
            class="w-full rounded-full glass py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            v-if="query"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-faint transition-colors hover:text-primary"
            aria-label="清空"
            @click="query = ''"
          >
            <SIcon name="X" :size="16" />
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300"
          :class="onlyPinned
            ? 'bg-gradient-brand text-white shadow-soft'
            : 'glass text-ink-muted hover:text-primary'"
          @click="onlyPinned = !onlyPinned"
        >
          <SIcon name="Pin" :size="16" />
          仅看置顶
        </button>
      </div>

      <!-- 空状态 -->
      <div v-if="!filteredCategories.length" class="py-20 text-center text-ink-faint">
        <SIcon name="Search" :size="40" class="mx-auto mb-4 opacity-50" />
        <p>没有匹配的项目，换个关键词试试。</p>
      </div>

      <!-- 按分类展示 -->
      <div v-if="filteredCategories.length" class="mx-auto max-w-4xl space-y-12">
        <div v-for="cat in filteredCategories" :key="cat.id">
          <!-- 分类标题 -->
          <div class="mb-5 flex items-center gap-3">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft"
            >
              <SIcon :name="cat.icon" :size="18" />
            </span>
            <div>
              <h2 class="text-lg font-bold text-ink">{{ cat.name }}</h2>
              <p v-if="cat.desc" class="text-sm text-ink-faint">{{ cat.desc }}</p>
            </div>
          </div>

          <!-- 项目网格 -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SCard
              v-for="(item, i) in cat.items"
              :key="item.id"
              :item="item"
              :pinned="isPinned(item.id)"
              :intensity="resolvedAnim.hoverIntensity"
              :index="i"
              @pin="togglePin"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
