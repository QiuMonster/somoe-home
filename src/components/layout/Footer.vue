<script setup lang="ts">
import { useConfig } from '@/hooks/useConfig'
import SIcon from '@/components/base/SIcon.vue'

const { profile } = useConfig()
</script>

<template>
  <footer class="mt-20 border-t border-line px-4 py-12">
    <div class="container">
      <div class="mx-auto max-w-5xl flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start">
        <!-- 左：品牌 -->
        <div class="flex flex-col items-center gap-2 sm:items-start">
          <div class="flex items-center gap-2">
            <template v-if="profile.logo">
              <img :src="profile.logo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover" />
              <span class="text-gradient text-lg font-extrabold">Somoe Home</span>
            </template>
            <template v-else>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft">
                <SIcon name="Sparkles" :size="16" />
              </span>
              <span class="text-gradient text-lg font-extrabold">Somoe Home</span>
            </template>
          </div>
          <p class="text-sm font-medium text-ink-muted">QiuMonster 的内容创作和开源项目的导航站点</p>
        </div>

        <!-- 右：导航 -->
        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <router-link to="/" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">首页</router-link>
          <router-link to="/friends" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">友链</router-link>
          <a href="https://blog.somoe.xyz" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-ink-muted transition-colors hover:text-primary">Ocean Blog</a>
          <a href="https://studio.qiumonster.com" target="_blank" rel="noopener noreferrer" class="text-sm text-ink-muted transition-colors hover:text-primary">QiuStudio</a>
          <a href="https://github.com/QiuMonster" target="_blank" rel="noopener noreferrer" class="text-sm text-ink-muted transition-colors hover:text-primary">GitHub</a>
        </nav>
      </div>

      <!-- 版权备案 -->
      <div class="mx-auto mt-10 max-w-5xl border-t border-line pt-6">
        <div class="flex flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>© 2026 Somoe Home. 保留所有权利。</p>
          <p>Powered by QiuMonster</p>
        </div>
        <div class="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-ink-faint sm:justify-end">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-primary"
          >
            皖ICP备2025087176号-2
          </a>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=341324020000239"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <img src="/beian.png" alt="" class="h-3.5 w-3.5" />
            皖公网安备341324020000239号
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
