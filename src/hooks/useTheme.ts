import { ref } from 'vue'
import { themeConfig } from '@/config/theme.config'
import type { ThemeMode, ResolvedTheme } from '@/types/config'

// ============================================================
// 主题切换逻辑（可复用）
// auto 跟随系统偏好；light / dark 强制；平滑过渡由 CSS 处理
// localStorage key 与 index.html 防闪烁脚本保持一致
// ============================================================

const KEY = 'somoe_theme'

function readMode(): ThemeMode {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark' || v === 'auto') return v
  } catch {
    /* ignore */
  }
  return themeConfig.defaultMode
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

const mode = ref<ThemeMode>(readMode())
const resolved = ref<ResolvedTheme>(
  mode.value === 'auto'
    ? systemPrefersDark()
      ? 'dark'
      : 'light'
    : (mode.value as ResolvedTheme),
)

function applyResolved() {
  const r: ResolvedTheme =
    mode.value === 'auto' ? (systemPrefersDark() ? 'dark' : 'light') : mode.value
  resolved.value = r
  const root = document.documentElement
  if (r === 'dark') root.classList.add('dark', 'theme-transition')
  else root.classList.remove('dark')
  root.classList.add('theme-transition')
}

// 监听系统主题变化（仅 auto 模式生效）
if (typeof window !== 'undefined') {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  mql.addEventListener('change', () => {
    if (mode.value === 'auto') applyResolved()
  })
}

export function useTheme() {
  function setMode(m: ThemeMode) {
    mode.value = m
    try {
      localStorage.setItem(KEY, m)
    } catch {
      /* ignore */
    }
    applyResolved()
  }

  /** 在亮/暗之间切换（忽略 auto，直接切到当前生效主题的反面） */
  function toggle() {
    setMode(resolved.value === 'dark' ? 'light' : 'dark')
  }

  // 首次应用，确保 resolved 与 DOM class 同步
  if (typeof document !== 'undefined') applyResolved()

  return { mode, resolved, setMode, toggle }
}
