<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useConfig } from '@/hooks/useConfig'
import SIcon from '@/components/base/SIcon.vue'
import STheme from '@/components/base/STheme.vue'
import STransition from '@/components/base/STransition.vue'

const route = useRoute()
const { profile, resolvedAnim, setAnim, resetAnim } = useConfig()

const scrolled = ref(false)
const panelOpen = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}
function togglePanel() {
  panelOpen.value = !panelOpen.value
  menuOpen.value = false
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value
  panelOpen.value = false
}
function closeAll() {
  menuOpen.value = false
  panelOpen.value = false
}

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
          <template v-if="profile.logo">
            <img :src="profile.logo" alt="Somoe Home" class="h-8 w-8 rounded-full object-cover transition-transform duration-500 group-hover:rotate-6" />
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
            to="/"
            class="hidden rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 sm:inline-block"
            :class="route.path === '/' ? 'border-sky-500 bg-sky-500/15 text-sky-500 ring-2 ring-sky-500/30' : 'border-transparent bg-sky-500/10 text-sky-500/70 hover:bg-sky-500/15 hover:text-sky-500'"
          >
            首页
          </router-link>

          <router-link
            to="/friends"
            class="hidden rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 sm:inline-block"
            :class="route.path === '/friends' ? 'border-rose-500 bg-rose-500/15 text-rose-500 ring-2 ring-rose-500/30' : 'border-transparent bg-rose-500/10 text-rose-500/70 hover:bg-rose-500/15 hover:text-rose-500'"
          >
            友链
          </router-link>

          <!-- 通用圆形按钮：GitHub -->
          <a
            href="https://github.com/QiuMonster/somoe-home"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary"
            aria-label="GitHub"
          >
            <SIcon name="Github" :size="20" />
          </a>

          <!-- 主题切换 -->
          <STheme :size="20" />

          <!-- 动效调节 -->
          <div class="relative hidden sm:block">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary"
              :class="panelOpen && 'text-primary'"
              aria-label="动效调节"
              @click="togglePanel"
            >
              <SIcon name="SlidersHorizontal" :size="20" />
            </button>

            <STransition name="scale">
              <div
                v-if="panelOpen"
                class="absolute right-0 top-12 w-72 rounded-2xl glass p-4 shadow-float"
              >
                <div class="mb-3 flex items-center justify-between">
                  <span class="text-sm font-semibold text-ink">动效调节</span>
                  <button
                    type="button"
                    class="text-xs text-ink-faint transition-colors hover:text-primary"
                    @click="resetAnim"
                  >
                    重置
                  </button>
                </div>

                <label class="block">
                  <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                    <span>入场时长</span><span>{{ resolvedAnim.duration.toFixed(2) }}s</span>
                  </div>
                  <input
                    type="range" min="0.3" max="1.5" step="0.05"
                    :value="resolvedAnim.duration"
                    class="w-full accent-[rgb(var(--color-primary))]"
                    @input="setAnim({ duration: Number(($event.target as HTMLInputElement).value) })"
                  />
                </label>

                <label class="mt-3 block">
                  <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                    <span>视差强度</span><span>{{ resolvedAnim.parallaxStrength.toFixed(2) }}</span>
                  </div>
                  <input
                    type="range" min="0" max="0.5" step="0.02"
                    :value="resolvedAnim.parallaxStrength"
                    class="w-full accent-[rgb(var(--color-primary))]"
                    @input="setAnim({ parallaxStrength: Number(($event.target as HTMLInputElement).value) })"
                  />
                </label>

                <label class="mt-3 block">
                  <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                    <span>Hover 强度</span><span>{{ resolvedAnim.hoverIntensity.toFixed(2) }}</span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.05"
                    :value="resolvedAnim.hoverIntensity"
                    class="w-full accent-[rgb(var(--color-primary))]"
                    @input="setAnim({ hoverIntensity: Number(($event.target as HTMLInputElement).value) })"
                  />
                </label>

                <label class="mt-3 flex items-center justify-between text-xs text-ink-muted">
                  <span>启用滚动视差</span>
                  <input
                    type="checkbox"
                    :checked="resolvedAnim.enableParallax"
                    class="accent-[rgb(var(--color-primary))]"
                    @change="setAnim({ enableParallax: ($event.target as HTMLInputElement).checked })"
                  />
                </label>
              </div>
            </STransition>
          </div>

          <!-- 移动端：更多按钮 -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full glass text-ink-muted transition-colors duration-300 hover:text-primary sm:hidden"
            :class="menuOpen && 'text-primary'"
            aria-label="菜单"
            @click="toggleMenu"
          >
            <SIcon :name="menuOpen ? 'X' : 'MoreHorizontal'" :size="20" />
          </button>
        </div>
      </nav>

      <!-- 移动端下拉菜单 -->
      <STransition name="scale">
        <div
          v-if="menuOpen"
          class="mt-2 rounded-2xl glass p-3 shadow-float sm:hidden"
        >
          <div class="flex flex-col gap-1">
            <router-link
              to="/"
              class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-200"
              :class="route.path === '/' ? 'border-sky-500 bg-sky-500/15 text-sky-500 ring-2 ring-sky-500/30' : 'border-transparent bg-sky-500/10 text-sky-500/70 hover:bg-sky-500/15 hover:text-sky-500'"
              @click="closeAll"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-xs font-bold text-sky-500">首</span>
              首页
            </router-link>

            <router-link
              to="/friends"
              class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-200"
              :class="route.path === '/friends' ? 'border-rose-500 bg-rose-500/15 text-rose-500 ring-2 ring-rose-500/30' : 'border-transparent bg-rose-500/10 text-rose-500/70 hover:bg-rose-500/15 hover:text-rose-500'"
              @click="closeAll"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-xs font-bold text-rose-500">友</span>
              友链
            </router-link>

            <div class="my-1 border-t border-line" />

            <!-- 动效调节（移动端内嵌） -->
            <div class="px-4 py-2">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-ink">动效调节</span>
                <button
                  type="button"
                  class="text-xs text-ink-faint transition-colors hover:text-primary"
                  @click="resetAnim"
                >
                  重置
                </button>
              </div>

              <label class="block">
                <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                  <span>入场时长</span><span>{{ resolvedAnim.duration.toFixed(2) }}s</span>
                </div>
                <input
                  type="range" min="0.3" max="1.5" step="0.05"
                  :value="resolvedAnim.duration"
                  class="w-full accent-[rgb(var(--color-primary))]"
                  @input="setAnim({ duration: Number(($event.target as HTMLInputElement).value) })"
                />
              </label>

              <label class="mt-2 block">
                <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                  <span>视差强度</span><span>{{ resolvedAnim.parallaxStrength.toFixed(2) }}</span>
                </div>
                <input
                  type="range" min="0" max="0.5" step="0.02"
                  :value="resolvedAnim.parallaxStrength"
                  class="w-full accent-[rgb(var(--color-primary))]"
                  @input="setAnim({ parallaxStrength: Number(($event.target as HTMLInputElement).value) })"
                />
              </label>

              <label class="mt-2 block">
                <div class="mb-1 flex items-center justify-between text-xs text-ink-muted">
                  <span>Hover 强度</span><span>{{ resolvedAnim.hoverIntensity.toFixed(2) }}</span>
                </div>
                <input
                  type="range" min="0" max="1" step="0.05"
                  :value="resolvedAnim.hoverIntensity"
                  class="w-full accent-[rgb(var(--color-primary))]"
                  @input="setAnim({ hoverIntensity: Number(($event.target as HTMLInputElement).value) })"
                />
              </label>

              <label class="mt-2 flex items-center justify-between text-xs text-ink-muted">
                <span>启用滚动视差</span>
                <input
                  type="checkbox"
                  :checked="resolvedAnim.enableParallax"
                  class="accent-[rgb(var(--color-primary))]"
                  @change="setAnim({ enableParallax: ($event.target as HTMLInputElement).checked })"
                />
              </label>
            </div>
          </div>
        </div>
      </STransition>
    </div>
  </header>
</template>
