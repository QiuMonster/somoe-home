<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useConfig } from '@/hooks/useConfig'
import { useTheme } from '@/hooks/useTheme'
import SIcon from '@/components/base/SIcon.vue'
import STheme from '@/components/base/STheme.vue'
import STransition from '@/components/base/STransition.vue'

const route = useRoute()
const { profile } = useConfig()
const { resolved } = useTheme()

const navItems = computed(() => profile.nav)
const currentLogo = computed(() => resolved.value === 'dark' ? (profile.logoDark || profile.logo) : profile.logo)

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(path + '/')
}

const colorPalette: Record<string, { active: string; inactive: string; mobileShort: string }> = {
  sky: {
    active: 'border-sky-500 bg-sky-500/15 text-sky-500 ring-2 ring-sky-500/30',
    inactive: 'border-transparent bg-sky-500/10 text-sky-500/70 hover:bg-sky-500/15 hover:text-sky-500',
    mobileShort: 'bg-sky-500/10 text-sky-500',
  },
  amber: {
    active: 'border-amber-500 bg-amber-500/15 text-amber-500 ring-2 ring-amber-500/30',
    inactive: 'border-transparent bg-amber-500/10 text-amber-500/70 hover:bg-amber-500/15 hover:text-amber-500',
    mobileShort: 'bg-amber-500/10 text-amber-500',
  },
  emerald: {
    active: 'border-emerald-500 bg-emerald-500/15 text-emerald-500 ring-2 ring-emerald-500/30',
    inactive: 'border-transparent bg-emerald-500/10 text-emerald-500/70 hover:bg-emerald-500/15 hover:text-emerald-500',
    mobileShort: 'bg-emerald-500/10 text-emerald-500',
  },
  violet: {
    active: 'border-violet-500 bg-violet-500/15 text-violet-500 ring-2 ring-violet-500/30',
    inactive: 'border-transparent bg-violet-500/10 text-violet-500/70 hover:bg-violet-500/15 hover:text-violet-500',
    mobileShort: 'bg-violet-500/10 text-violet-500',
  },
  rose: {
    active: 'border-rose-500 bg-rose-500/15 text-rose-500 ring-2 ring-rose-500/30',
    inactive: 'border-transparent bg-rose-500/10 text-rose-500/70 hover:bg-rose-500/15 hover:text-rose-500',
    mobileShort: 'bg-rose-500/10 text-rose-500',
  },
}

function getColor(color: string) {
  return colorPalette[color] || colorPalette['sky']
}

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeAll() {
  menuOpen.value = false
}

watch(() => route.path, () => {
  menuOpen.value = false
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-liquid"
    :class="scrolled ? 'py-2' : 'py-4'"
  >
    <div class="container">
      <nav
        class="flex items-center justify-between rounded-full px-3 py-1.5 transition-all duration-500 ease-liquid sm:px-5 sm:py-2"
        :class="scrolled ? 'glass shadow-soft' : 'border border-transparent'"
      >
        <!-- 左：Logo -->
        <router-link
          to="/"
          class="group flex items-center gap-2 text-lg font-semibold tracking-tight"
          @click="closeAll"
        >
          <template v-if="currentLogo">
            <img :src="currentLogo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover transition-transform duration-500 group-hover:rotate-6" />
            <span class="text-gradient font-extrabold">Somoe Home</span>
          </template>
          <template v-else>
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft transition-transform duration-500 group-hover:rotate-6">
              <SIcon name="Sparkles" :size="18" />
            </span>
            <span class="text-gradient font-extrabold">Somoe Home</span>
          </template>
        </router-link>

        <!-- 右：操作区 -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- 桌面端：胶囊菜单 -->
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="hidden rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 sm:inline-block"
            :class="isActive(item.path) ? getColor(item.color).active : getColor(item.color).inactive"
          >
            {{ item.label }}
          </router-link>

          <!-- 搜索（桌面+移动端均显示） -->
          <router-link
            to="/search"
            class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary"
            aria-label="搜索"
            @click="closeAll"
          >
            <SIcon name="Search" :size="20" />
          </router-link>

          <!-- GitHub（仅桌面端） -->
          <a
            href="https://github.com/QiuMonster/somoe-home"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary sm:flex"
            aria-label="GitHub"
          >
            <SIcon name="Github" :size="20" />
          </a>

          <!-- 主题切换（桌面+移动端均显示） -->
          <STheme :size="20" />

          <!-- RSS（仅桌面端） -->
          <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-orange-500 sm:flex"
              aria-label="RSS"
          >
            <SIcon name="Rss" :size="20" />
          </a>

          <!-- 移动端：菜单按钮 -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary sm:hidden"
            :class="menuOpen && 'text-primary'"
            aria-label="菜单"
            @click="toggleMenu"
          >
            <SIcon :name="menuOpen ? 'X' : 'Menu'" :size="20" />
          </button>
        </div>
      </nav>

      <!-- 移动端：遮罩层 -->
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 sm:hidden"
        @click="closeAll"
      />

      <!-- 移动端下拉菜单 -->
      <STransition name="scale">
        <div
          v-if="menuOpen"
          class="relative z-50 mt-2 rounded-2xl bg-surface/95 p-3 shadow-float backdrop-blur-xl sm:hidden dark:bg-surface-dark/95"
          @click.stop
        >
          <div class="flex flex-col gap-1">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-200"
              :class="isActive(item.path) ? getColor(item.color).active : getColor(item.color).inactive"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" :class="getColor(item.color).mobileShort">{{ item.shortLabel || item.label.charAt(0) }}</span>
              {{ item.label }}
            </router-link>

            <div class="my-1 border-t border-line" />

            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-bold text-ink-muted transition-all duration-200 hover:bg-orange-500/10 hover:text-orange-500"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-500">R</span>
              RSS 订阅
            </a>

            <a
              href="https://github.com/QiuMonster/somoe-home"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-bold text-ink-muted transition-all duration-200 hover:bg-primary/10 hover:text-primary"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">G</span>
              GitHub
            </a>
          </div>
        </div>
      </STransition>
    </div>
  </header>
</template>
