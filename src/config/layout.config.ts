import type { LayoutConfig } from '@/types/config'

export const layoutConfig: LayoutConfig = {
  // Hero 个人信息区域布局配置
  hero: {
    maxWidth: '44rem',           // Hero 区域内容最大宽度（CSS 值，控制个人信息容器宽度）
  },

  // SiteGrid 站点卡片网格区域布局配置
  siteGrid: {
    maxWidth: '56rem',           // SiteGrid 区域内容最大宽度（CSS 值，控制搜索栏与卡片网格宽度）
  },

  // Footer 底部区域布局配置
  footer: {
    maxWidth: '64rem',           // Footer 区域内容最大宽度（CSS 值，控制底部品牌/导航/备案宽度）
  },
}

export default layoutConfig
