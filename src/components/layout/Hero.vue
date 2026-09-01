<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useConfig } from '@/hooks/useConfig'
import { useGsapAnim } from '@/hooks/useGsapAnim'
import SIcon from '@/components/base/SIcon.vue'

const { profile, theme, layout } = useConfig()
const { enter, charsEnter, staggerEnter } = useGsapAnim()

const avatarEl = ref<HTMLElement | null>(null)
const nicknameCharsEl = ref<HTMLElement | null>(null)
const sloganEl = ref<HTMLElement | null>(null)
const bioEl = ref<HTMLElement | null>(null)
const domainsEl = ref<HTMLElement | null>(null)
const tagsEl = ref<HTMLElement | null>(null)
const socialsEl = ref<HTMLElement | null>(null)

const avatarInitial = computed(() => profile.nickname.charAt(0).toUpperCase())
const nicknameChars = computed(() => profile.nickname.split(''))
const bioLines = computed(() => profile.bio.split('\n'))

const socialColors = [
  { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-500', hover: 'hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-rose-500/25 hover:ring-2 hover:ring-rose-300/50' },
  { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-500', hover: 'hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-sky-500/25 hover:ring-2 hover:ring-sky-300/50' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-500', hover: 'hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-amber-500/25 hover:ring-2 hover:ring-amber-300/50' },
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500', hover: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-emerald-500/25 hover:ring-2 hover:ring-emerald-300/50' },
  { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-500', hover: 'hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-violet-500/25 hover:ring-2 hover:ring-violet-300/50' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-500', hover: 'hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-cyan-500/25 hover:ring-2 hover:ring-cyan-300/50' },
]

function socialClass(i: number): string {
  const c = socialColors[i % socialColors.length]
  return `${c.bg} ${c.border} ${c.text} ${c.hover}`
}
const tagColors = [
  'bg-rose-500/10 text-rose-500',
  'bg-sky-500/10 text-sky-500',
  'bg-amber-500/10 text-amber-500',
  'bg-emerald-500/10 text-emerald-500',
  'bg-violet-500/10 text-violet-500',
  'bg-cyan-500/10 text-cyan-500',
  'bg-pink-500/10 text-pink-500',
  'bg-teal-500/10 text-teal-500',
]

/** 将水印配置转为 CSS 自定义变量，通过 :style 绑定到 section，供 global.css ::after 使用 */
const watermarkVars = computed(() => {
  const w = theme.watermark
  if (!w || !w.enabled) return { '--wm-display': 'none' }
  return {
    '--wm-display': 'block',
    '--wm-text': `"${w.text}"`,
    '--wm-size': `${w.fontSize}vw`,
    '--wm-rotate': `${w.rotate}deg`,
    '--wm-x': `calc(50% + ${w.offsetX}vw)`,
    '--wm-y': `calc(50% + ${w.offsetY}vh)`,
    '--wm-opacity': w.opacity,
    '--wm-opacity-dark': w.opacityDark,
  }
})

function tagClass(index: number): string {
  return tagColors[index % tagColors.length]
}

onMounted(async () => {
  await nextTick()
  enter(avatarEl.value, { y: 20, delay: 0 })
  if (nicknameCharsEl.value) {
    charsEnter(nicknameCharsEl.value.children, { delay: 0.15 })
  }
  enter(sloganEl.value, { y: 12, delay: 0.5 })
  enter(bioEl.value, { y: 16, delay: 0.7 })
  enter(domainsEl.value, { y: 12, delay: 0.85 })
  if (tagsEl.value) {
    staggerEnter(tagsEl.value.children, { y: 12, stagger: 0.06, delay: 1.05 })
  }
  if (socialsEl.value) {
    staggerEnter(socialsEl.value.children, { y: 14, stagger: 0.07, delay: 1.25 })
  }
})
</script>

<template>
  <section id="about" class="hero-texture relative flex min-h-screen items-center justify-center" :style="watermarkVars">
    <div class="container px-4 py-8 sm:px-6 sm:py-12">
      <div class="mx-auto" :style="{ maxWidth: layout.hero.maxWidth }">
        <!-- 头像 + 名称行 -->
        <div class="flex items-center gap-4 sm:gap-6">
          <div
            ref="avatarEl"
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-2xl font-bold text-white shadow-float ring-3 ring-bg sm:h-24 sm:w-24 sm:text-3xl"
            style="opacity:0"
          >
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              :alt="profile.nickname"
              class="h-full w-full rounded-full object-cover"
            />
            <span v-else>{{ avatarInitial }}</span>
          </div>
          <div class="min-w-0">
            <h1 ref="nicknameCharsEl" class="text-3xl font-bold text-ink sm:text-5xl" style="perspective:600px">
              <span
                v-for="(ch, i) in nicknameChars"
                :key="i"
                class="inline-block"
                style="opacity:0"
              >{{ ch }}</span>
            </h1>
            <p ref="sloganEl" class="mt-1 text-base font-semibold text-ink-muted sm:mt-2 sm:text-lg" style="opacity:0">{{ profile.slogan }}</p>
          </div>
        </div>

        <!-- 描述 -->
        <div ref="bioEl" class="mt-6 sm:mt-8" style="opacity:0">
          <p v-for="(line, i) in bioLines" :key="i" class="text-base font-medium text-ink sm:text-lg" style="line-height:2">{{ line }}</p>
        </div>

        <!-- 域名展示 -->
        <div v-if="profile.domains?.length" ref="domainsEl" class="mt-6 sm:mt-8" style="opacity:0">
          <p class="flex flex-wrap items-center gap-x-2 text-base font-medium leading-relaxed text-ink sm:text-lg">
            <span>我的域名：</span>
            <template v-for="(d, i) in profile.domains" :key="d.name">
              <a :href="d.url" target="_blank" rel="noopener noreferrer" class="text-base text-blue-500 underline transition-colors hover:text-blue-600">{{ d.name }}</a>
              <span v-if="i < profile.domains.length - 1" class="text-ink-faint">·</span>
            </template>
          </p>
        </div>

        <!-- 标签 -->
        <div class="mt-6 sm:mt-8">
          <div v-if="profile.tags?.length" ref="tagsEl" class="flex flex-wrap gap-2 sm:gap-3">
            <span
              v-for="(tag, i) in profile.tags"
              :key="tag"
              class="rounded-full px-3 py-1 text-sm font-medium sm:px-4 sm:py-1.5 sm:text-base"
              :class="tagClass(i)"
              style="opacity:0"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 社交 -->
        <div class="mt-6 sm:mt-8">
          <div v-if="profile.socials.length" ref="socialsEl" class="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
               v-for="(s, i) in profile.socials"
               :key="s.name"
               :href="s.url"
               target="_blank"
               rel="noopener noreferrer"
               class="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-5 sm:py-2.5 sm:text-base"
               :class="socialClass(i)"
               style="opacity:0"
               :aria-label="s.name"
               :title="s.name"
             >
               <SIcon :name="s.icon" :size="17" class="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
               <span>{{ s.name }}</span>
             </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
