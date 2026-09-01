<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfig } from '@/hooks/useConfig'
import { useTheme } from '@/hooks/useTheme'
import SIcon from '@/components/base/SIcon.vue'
import STheme from '@/components/base/STheme.vue'
import STransition from '@/components/base/STransition.vue'

const route = useRoute()
const { profile, nav } = useConfig()
const { resolved } = useTheme()

const scrolled = ref(false)
const menuOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)

const currentLogo = computed(() => {
  if (profile.logoLight && profile.logoDark) {
    return resolved.value === 'dark' ? profile.logoDark : profile.logoLight
  }
  return profile.logo
})

function onScroll() {
  scrolled.value = window.scrollY > 40
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeMenu() {
  menuOpen.value = false
}

function isActive(menuItem: { path?: string; url?: string }): boolean {
  return !!(menuItem.path && route.path === menuItem.path)
}

const colorMap: Record<string, { active: string; inactive: string }> = {
  sky: {
    active: 'border-sky-500 bg-sky-500/15 text-sky-500 ring-2 ring-sky-500/30',
    inactive: 'border-transparent bg-sky-500/10 text-sky-500/70 hover:bg-sky-500/15 hover:text-sky-500',
  },
  rose: {
    active: 'border-rose-500 bg-rose-500/15 text-rose-500 ring-2 ring-rose-500/30',
    inactive: 'border-transparent bg-rose-500/10 text-rose-500/70 hover:bg-rose-500/15 hover:text-rose-500',
  },
  amber: {
    active: 'border-amber-500 bg-amber-500/15 text-amber-500 ring-2 ring-amber-500/30',
    inactive: 'border-transparent bg-amber-500/10 text-amber-500/70 hover:bg-amber-500/15 hover:text-amber-500',
  },
  emerald: {
    active: 'border-emerald-500 bg-emerald-500/15 text-emerald-500 ring-2 ring-emerald-500/30',
    inactive: 'border-transparent bg-emerald-500/10 text-emerald-500/70 hover:bg-emerald-500/15 hover:text-emerald-500',
  },
  violet: {
    active: 'border-violet-500 bg-violet-500/15 text-violet-500 ring-2 ring-violet-500/30',
    inactive: 'border-transparent bg-violet-500/10 text-violet-500/70 hover:bg-violet-500/15 hover:text-violet-500',
  },
}
const defaultColor = {
  active: 'border-sky-500 bg-sky-500/15 text-sky-500 ring-2 ring-sky-500/30',
  inactive: 'border-transparent bg-sky-500/10 text-sky-500/70 hover:bg-sky-500/15 hover:text-sky-500',
}

function menuColor(item: { color?: string; path?: string; url?: string }): string {
  const c = colorMap[item.color ?? ''] ?? defaultColor
  return isActive(item) ? c.active : c.inactive
}

function onDocumentClick(e: MouseEvent) {
  if (!menuOpen.value) return
  const target = e.target as HTMLElement
  if (panelRef.value && panelRef.value.contains(target)) return
  closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocumentClick)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
})
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
        >
          <template v-if="currentLogo">
            <img :src="currentLogo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover transition-transform duration-500 group-hover:rotate-6" />
            <span class="text-gradient font-extrabold">{{ nav.brand.name }}</span>
          </template>
          <template v-else>
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft transition-transform duration-500 group-hover:rotate-6">
              <SIcon :name="nav.brand.icon" :size="18" />
            </span>
            <span class="text-gradient font-extrabold">{{ nav.brand.name }}</span>
          </template>
        </router-link>

        <!-- 右：操作区 -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- 桌面端：胶囊菜单 -->
          <template v-for="item in nav.topMenu" :key="item.id">
            <router-link
              v-if="item.path"
              :to="item.path"
              class="hidden rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 sm:inline-block"
              :class="menuColor(item)"
            >
              {{ item.label }}
            </router-link>
          </template>



          <!-- 主题切换 -->
          <STheme :size="20" />
          <!-- 通用圆形按钮：外部链接 -->
          <template v-for="item in nav.topLinks" :key="item.id">
            <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary"
                :aria-label="item.label"
            >
              <SIcon :name="item.icon" :size="20" />
            </a>
          </template>
          <!-- 移动端：菜单按钮 -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary sm:hidden"
            :class="menuOpen && 'text-primary'"
            aria-label="菜单"
            @click.stop="toggleMenu"
          >
            <svg v-if="menuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
          </button>
        </div>
      </nav>

      <!-- 移动端下拉菜单 -->
      <STransition name="scale">
        <div
          v-if="menuOpen"
          ref="panelRef"
          class="mt-2 rounded-2xl glass p-3 shadow-float sm:hidden"
          @click.stop
        >
          <div class="flex flex-col gap-1">
            <template v-for="item in nav.topMenu" :key="item.id">
              <router-link
                v-if="item.path"
                :to="item.path"
                class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-200"
                :class="menuColor(item)"
              >
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-xs font-bold text-sky-500">{{ item.label.charAt(0) }}</span>
                {{ item.label }}
              </router-link>
            </template>

            <template v-if="nav.topLinks.length || nav.mobileExtraLinks.length">
              <div class="my-1 border-t border-line" />
              <template v-for="item in [...nav.topLinks, ...nav.mobileExtraLinks]" :key="item.id">
                <a
                  v-if="item.url"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:text-primary"
                >
                  <SIcon :name="item.icon" :size="16" />
                  {{ item.label }}
                </a>
              </template>
            </template>
          </div>
        </div>
      </STransition>
    </div>
  </header>
</template>
