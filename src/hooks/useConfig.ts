import { reactive, computed, watch } from 'vue'
import { siteConfig } from '@/config/site.config'
import { profileConfig } from '@/config/profile.config'
import { themeConfig } from '@/config/theme.config'
import { blogConfig } from '@/config/blog.config'
import type { AnimConfig } from '@/types/config'

const PINNED_KEY = 'somoe_pinned'
const ANIM_KEY = 'somoe_anim'

/** 读取本地置顶列表；无记录时以配置 pinned 项为默认 */
function readPinned(): string[] {
  try {
    const stored = localStorage.getItem(PINNED_KEY)
    if (stored) return JSON.parse(stored) as string[]
  } catch {
    /* ignore */
  }
  return siteConfig.categories.flatMap((c) =>
    c.items.filter((i) => i.pinned).map((i) => i.id),
  )
}

/** 读取本地动效覆盖（用户调节的强度） */
function readAnimOverrides(): Partial<AnimConfig> {
  try {
    const stored = localStorage.getItem(ANIM_KEY)
    if (stored) return JSON.parse(stored) as Partial<AnimConfig>
  } catch {
    /* ignore */
  }
  return {}
}

const state = reactive({
  pinned: readPinned(),
  animOverrides: readAnimOverrides() as Partial<AnimConfig>,
})

// 持久化到 localStorage
watch(
  () => state.pinned,
  (v) => {
    try {
      localStorage.setItem(PINNED_KEY, JSON.stringify(v))
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)
watch(
  () => state.animOverrides,
  (v) => {
    try {
      localStorage.setItem(ANIM_KEY, JSON.stringify(v))
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)

export function useConfig() {
  /** 合并默认动效与用户覆盖后的生效动效参数 */
  const resolvedAnim = computed<AnimConfig>(() => ({
    ...themeConfig.anim,
    ...state.animOverrides,
  }))

  const isPinned = (id: string) => state.pinned.includes(id)

  function togglePin(id: string) {
    const idx = state.pinned.indexOf(id)
    if (idx >= 0) state.pinned.splice(idx, 1)
    else state.pinned.push(id)
  }

  function setAnim(patch: Partial<AnimConfig>) {
    state.animOverrides = { ...state.animOverrides, ...patch }
  }

  function resetAnim() {
    state.animOverrides = {}
  }

  return {
    site: siteConfig,
    profile: profileConfig,
    theme: themeConfig,
    blog: blogConfig,
    prefs: state,
    resolvedAnim,
    isPinned,
    togglePin,
    setAnim,
    resetAnim,
  }
}
