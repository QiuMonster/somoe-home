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

/** 本站信息（友链交换用） */
export interface SiteProfile {
  /** 站点名称 */
  name: string
  /** 站点地址 */
  url: string
  /** 站点头像 */
  avatar: string
  /** 站点描述 */
  description: string
  /** RSS 订阅地址 */
  rss?: string
  /** 站点背景图 */
  bg?: string
}

/** 备案信息 */
export interface FilingInfo {
  /** ICP 备案号 */
  icp?: string
  /** ICP 备案查询链接 */
  icpUrl?: string
  /** 公网安备号 */
  police?: string
  /** 公网安备查询链接 */
  policeUrl?: string
  /** 公网安备图标路径 */
  policeIcon?: string
}

/** 底部信息 */
export interface FooterInfo {
  /** 版权文案 */
  copyright: string
  /** 站点描述（底部品牌区域简介） */
  siteDesc?: string
  /** 技术支持文案（如 Powered by xxx） */
  poweredBy?: string
  /** 备案信息 */
  filing?: FilingInfo
}

/** 导航菜单项 */
export interface NavItem {
  /** 显示名称 */
  label: string
  /** 路由路径 */
  path: string
  /** Tailwind 主色名（sky/amber/emerald/violet/rose 等） */
  color: string
  /** 移动端圆形图标内的单字（留空则取 label 首字） */
  shortLabel?: string
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
  /** Logo 暗色模式图片路径（public 目录，留空则使用 logo） */
  logoDark?: string
  /** 身份/技术栈标签 */
  tags?: string[]
  /** 社交链接列表 */
  socials: SocialLink[]
  /** 域名列表 */
  domains?: DomainLink[]
  /** 导航菜单项 */
  nav: NavItem[]
  /** 本站信息（友链交换用） */
  siteProfile?: SiteProfile
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

/** 博客加载模式 */
export type BlogLoadMode = 'scroll' | 'pagination'

/** 博客配置 */
export interface BlogConfig {
  columns: number
  loadMode: BlogLoadMode
  pageSize: number
  toc: boolean
  tocOffset: number
}

/** 用户偏好（localStorage 持久化） */
export interface UserPrefs {
  theme: ThemeMode
  pinned: string[]
  anim: Partial<AnimConfig>
}
