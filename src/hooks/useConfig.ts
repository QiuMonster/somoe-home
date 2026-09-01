import { reactive, watch } from 'vue'
import { siteConfig } from '@/config/site.config'
import { profileConfig } from '@/config/profile.config'
import { themeConfig } from '@/config/theme.config'
import { navConfig } from '@/config/nav.config'
import { footerConfig } from '@/config/footer.config'
import { layoutConfig } from '@/config/layout.config'

const PINNED_KEY = 'somoe_pinned'

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

const state = reactive({
  pinned: readPinned(),
})

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

export function useConfig() {
  const isPinned = (id: string) => state.pinned.includes(id)

  function togglePin(id: string) {
    const idx = state.pinned.indexOf(id)
    if (idx >= 0) state.pinned.splice(idx, 1)
    else state.pinned.push(id)
  }

  return {
    site: siteConfig,
    profile: profileConfig,
    theme: themeConfig,
    nav: navConfig,
    footer: footerConfig,
    layout: layoutConfig,
    prefs: state,
    isPinned,
    togglePin,
  }
}
