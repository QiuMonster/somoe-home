<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import { useTheme } from '@/hooks/useTheme'
import SIcon from '@/components/base/SIcon.vue'

const { profile, footer, layout } = useConfig()
const { resolved } = useTheme()

const currentLogo = computed(() => {
  if (profile.logoLight && profile.logoDark) {
    return resolved.value === 'dark' ? profile.logoDark : profile.logoLight
  }
  return profile.logo
})
</script>

<template>
  <footer class="mt-20 border-t border-line px-4 py-12">
    <div class="container">
      <div class="mx-auto flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start" :style="{ maxWidth: layout.footer.maxWidth }">
        <!-- 左：品牌 -->
        <div class="flex flex-col items-center gap-2 sm:items-start">
          <div class="flex items-center gap-2">
            <template v-if="currentLogo">
              <img :src="currentLogo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover" />
              <span class="text-gradient text-lg font-extrabold">{{ footer.brand.name }}</span>
            </template>
            <template v-else>
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft">
                <SIcon :name="footer.brand.icon" :size="16" />
              </span>
              <span class="text-gradient text-lg font-extrabold">{{ footer.brand.name }}</span>
            </template>
          </div>
          <p class="text-sm font-medium text-ink-muted">{{ footer.brand.desc }}</p>
        </div>

        <!-- 右：导航 -->
        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <template v-for="link in footer.links" :key="link.id">
            <router-link
              v-if="link.path"
              :to="link.path"
              class="text-sm font-bold text-ink-muted transition-colors hover:text-primary"
            >{{ link.label }}</router-link>
            <a
              v-else-if="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-bold text-ink-muted transition-colors hover:text-primary"
            >{{ link.label }}</a>
          </template>
        </nav>
      </div>

      <!-- 版权备案 -->
      <div class="mx-auto mt-10 border-t border-line pt-6" :style="{ maxWidth: layout.footer.maxWidth }">
        <div class="flex flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>{{ footer.copyright }}</p>
          <p v-if="footer.poweredBy">{{ footer.poweredBy }}</p>
        </div>
        <div v-if="footer.filing" class="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-ink-faint sm:justify-end">
          <a
            v-if="footer.filing.icp"
            :href="footer.filing.icp.url"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-primary"
          >
            {{ footer.filing.icp.text }}
          </a>
          <a
            v-if="footer.filing.police"
            :href="footer.filing.police.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <img v-if="footer.filing.police.icon" :src="footer.filing.police.icon" alt="" class="h-3.5 w-3.5" />
            {{ footer.filing.police.text }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
