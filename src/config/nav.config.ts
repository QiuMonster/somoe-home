import type { NavConfig } from '@/types/config'

export const navConfig: NavConfig = {
  // 品牌标识配置（导航栏左侧 Logo 区域）
  brand: {
    name: 'Somoe Home',          // 品牌名称，显示在 Logo 图标右侧
    icon: 'Sparkles',            // 品牌 Lucide 图标名（无 Logo 图片时作为兜底图标）
  },

  // 顶部导航菜单项（桌面端显示为胶囊按钮，移动端显示在下拉面板中）
  topMenu: [
    {
      id: 'home',                // 菜单项唯一标识，用于路由匹配与 key 绑定
      label: '首页',             // 菜单项显示文字
      path: '/',                 // 站内路由路径（与 url 二选一，path 优先渲染为 router-link）
      icon: 'Home',              // 菜单项 Lucide 图标名（移动端面板展示用）
      color: 'sky',              // 胶囊按钮配色方案（可选值：sky / rose / amber / emerald / violet）
    },
  ],

  // 顶部右侧圆形图标链接（桌面端+移动端均显示，适合 GitHub 等外部入口）
  topLinks: [
    {
      id: 'github',              // 链接唯一标识
      label: 'GitHub',           // 链接名称（用于 aria-label 无障碍提示）
      url: 'https://github.com/QiuMonster/somoe-home', // 外部链接地址（新窗口打开）
      icon: 'Github',            // 链接 Lucide 图标名
      external: true,            // 是否为外部链接（true 表示新标签页打开）
    },
  ],

  // 移动端下拉面板额外链接（仅在移动端面板中显示，桌面端不渲染）
  mobileExtraLinks: [],
}

export default navConfig
