// ============================================================
// 全局配置 TS 类型定义（开源友好，强类型约束，杜绝 any）
// ============================================================

/** 主题模式：auto 跟随系统，light/dark 强制 */
export type ThemeMode = 'auto' | 'light' | 'dark'

/** 实际生效的主题（auto 已被解析） */
export type ResolvedTheme = 'light' | 'dark'

/** 站点项 */
export interface SiteItem {
  /** 唯一标识 */
  id: string
  /** 站点标题 */
  title: string
  /** 站点描述 */
  description: string
  /** 站点链接 */
  url: string
  /** Lucide 图标名（PascalCase，如 'Rocket'） */
  icon: string
  /** 卡片背景图（URL 或 public 路径） */
  image?: string
  /** 是否置顶（优先排序展示） */
  pinned?: boolean
  /** 是否启用 */
  enabled?: boolean
  /** 关键词（用于搜索命中） */
  tags?: string[]
}

/** 站点分类 */
export interface SiteCategory {
  /** 分类唯一标识 */
  id: string
  /** 分类名称 */
  name: string
  /** 分类图标（Lucide 名） */
  icon: string
  /** 分类简述 */
  desc?: string
  /** 是否启用 */
  enabled?: boolean
  /** 分类下的站点列表 */
  items: SiteItem[]
}

/** 站点配置聚合 */
export interface SiteConfig {
  categories: SiteCategory[]
}

/** 社交链接 */
export interface SocialLink {
  /** 显示名称 */
  name: string
  /** 链接地址 */
  url: string
  /** Lucide 图标名 */
  icon: string
}

/** 域名链接 */
export interface DomainLink {
  /** 域名文字（如 qiumonster.com） */
  name: string
  /** 域名跳转地址 */
  url: string
}

/** 水印配置 */
export interface WatermarkConfig {
  /** 是否启用水印 */
  enabled: boolean
  /** 水印文字内容 */
  text: string
  /** 字体大小（vw 视口宽度单位，值越大字越大） */
  fontSize: number
  /** 旋转角度（deg，负数逆时针，正数顺时针） */
  rotate: number
  /** 水平偏移（vw，0 为居中，正值右移，负值左移） */
  offsetX: number
  /** 垂直偏移（vh，0 为居中，正值下移，负值上移） */
  offsetY: number
  /** 透明度 0~1（亮色主题，值越小越淡） */
  opacity: number
  /** 透明度 0~1（暗色主题，可适当调大以保持可见） */
  opacityDark: number
}

/** 背景波点配置 */
export interface DotConfig {
  /** 是否启用波点 */
  enabled: boolean
  /** 波点颜色（RGB 三元组字符串，如 '79 144 205'） */
  color: string
  /** 波点透明度（亮色主题，0~1） */
  opacity: number
  /** 波点透明度（暗色主题，0~1） */
  opacityDark: number
  /** 波点间距（px） */
  size: number
  /** 波点半径（px） */
  radius: number
}

/** 背景动态流体配置（GLSL 着色器） */
export interface FluidConfig {
  /** 是否启用流体效果 */
  enabled: boolean
  /** 流体颜色1（RGB 三元组字符串，如 '79 144 205'） */
  color1: string
  /** 流体颜色2（RGB 三元组字符串） */
  color2: string
  /** 流体颜色3（RGB 三元组字符串） */
  color3: string
  /** 流体透明度强度（亮色主题，0~1，值越小越淡） */
  intensity: number
  /** 流体透明度强度（暗色主题，0~1） */
  intensityDark: number
  /** 流体流速（0~1，0 为静止） */
  speed: number
}

/** 主题背景色配置 */
export interface ThemeBgConfig {
  /** 亮色主题背景色（RGB 三元组字符串） */
  light: string
  /** 暗色主题背景色（RGB 三元组字符串） */
  dark: string
}

/** 底部信息 */
export interface FooterInfo {
  /** 技术栈标签 */
  techStack: string[]
  /** 版权文案 */
  copyright: string
  /** 签名格言 */
  signature: string
  /** 是否展示访问统计（前端模拟） */
  visitStats?: boolean
}

/** 个人信息配置 */
export interface ProfileConfig {
  /** 昵称 */
  nickname: string
  /** 标语 */
  slogan: string
  /** 个人简介 */
  bio: string
  /** GitHub 主页地址 */
  github: string
  /** 头像（URL 或留空使用首字母渐变头像） */
  avatar?: string
  /** Logo 图片路径（public 目录，导航栏+底部使用，留空则显示文字+图标） */
  logo?: string
  /** 身份/技术栈标签 */
  tags?: string[]
  /** 社交链接列表 */
  socials: SocialLink[]
  /** 域名列表 */
  domains?: DomainLink[]
  footer: FooterInfo
}

/** 动效参数 */
export interface AnimConfig {
  /** 动画时长（秒） */
  duration: number
  /** 视差强度（0~1，越大位移越明显） */
  parallaxStrength: number
  /** hover 强度（0~1，越大上浮越明显） */
  hoverIntensity: number
  /** 是否启用滚动视差 */
  enableParallax: boolean
}

/** 主题样式配置 */
export interface ThemeConfig {
  /** 默认主题模式 */
  defaultMode: ThemeMode
  /** 主色（雾蓝 #4F94CD） */
  primaryColor: string
  /** 渐变副色（青绿 #64C2A6） */
  secondaryColor: string
  /** 点缀色（极淡鎏金 #E8DCCA） */
  accentColor: string
  /** 卡片圆角（px） */
  borderRadius: number
  /** 动效参数 */
  anim: AnimConfig
  /** 页面背景色（亮色/暗色） */
  bg: ThemeBgConfig
  /** 波点配置 */
  dots: DotConfig
  /** 流体背景配置 */
  fluid: FluidConfig
  /** 水印配置 */
  watermark: WatermarkConfig
}

/** 用户偏好（localStorage 持久化） */
export interface UserPrefs {
  theme: ThemeMode
  pinned: string[]
  anim: Partial<AnimConfig>
}
