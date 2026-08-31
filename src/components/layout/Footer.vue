<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import { useTheme } from '@/hooks/useTheme'
import SIcon from '@/components/base/SIcon.vue'

const { profile } = useConfig()
const { resolved } = useTheme()

const currentLogo = computed(() => resolved.value === 'dark' ? (profile.logoDark || profile.logo) : profile.logo)
</script>

<template>
  <footer class="mt-20 border-t border-line px-4 py-12">
    <div class="container">
      <div class="mx-auto max-w-5xl flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start">
        <!-- 左：品牌 -->
        <div class="flex flex-col items-center gap-2 sm:items-start">
          <div class="flex items-center gap-2">
            <template v-if="currentLogo">
              <img :src="currentLogo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover" />
              <span class="text-gradient text-lg font-extrabold">Somoe Home</span>
            </template>
            <template v-else>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft">
                <SIcon name="Sparkles" :size="16" />
              </span>
              <span class="text-gradient text-lg font-extrabold">Somoe Home</span>
            </template>
          </div>
          <p class="text-sm font-medium text-ink-muted">{{ profile.footer.siteDesc }}</p>
        </div>

        <!-- 右：导航 -->
        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <router-link to="/" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">首页</router-link>
          <router-link to="/blog" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">博客</router-link>
          <router-link to="/category" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">分类</router-link>
          <router-link to="/archive" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">归档</router-link>
          <router-link to="/friends" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">友链</router-link>
          <a href="https://blog.somoe.xyz" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">Ocean Blog</a>
          <a href="https://studio.qiumonster.com" target="_blank" rel="noopener noreferrer" class="text-sm text-ink-muted transition-colors hover:text-primary">QiuStudio</a>
          <a href="https://github.com/QiuMonster" target="_blank" rel="noopener noreferrer" class="text-sm text-ink-muted transition-colors hover:text-primary">GitHub</a>
        </nav>
      </div>

      <!-- 版权备案 -->
      <div class="mx-auto mt-10 max-w-5xl border-t border-line pt-6">
        <div class="flex flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>{{ profile.footer.copyright }}</p>
          <p>{{ profile.footer.poweredBy }}</p>
        </div>
        <div v-if="profile.footer.filing" class="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-ink-faint sm:justify-end">
          <a
            v-if="profile.footer.filing.icp"
            :href="profile.footer.filing.icpUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-primary"
          >
            {{ profile.footer.filing.icp }}
          </a>
          <a
            v-if="profile.footer.filing.police"
            :href="profile.footer.filing.policeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <img v-if="profile.footer.filing.policeIcon" :src="profile.footer.filing.policeIcon" alt="" class="h-3.5 w-3.5" />
            {{ profile.footer.filing.police }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
