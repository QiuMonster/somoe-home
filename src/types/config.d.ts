export type ThemeMode = 'auto' | 'light' | 'dark'

export type ResolvedTheme = 'light' | 'dark'

export interface SiteItem {
  id: string
  title: string
  description: string
  url: string
  icon: string
  image?: string
  pinned?: boolean
  enabled?: boolean
  tags?: string[]
}

export interface SiteCategory {
  id: string
  name: string
  icon: string
  desc?: string
  enabled?: boolean
  items: SiteItem[]
}

export interface SiteConfig {
  categories: SiteCategory[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface DomainLink {
  name: string
  url: string
}

export interface WatermarkConfig {
  enabled: boolean
  text: string
  fontSize: number
  rotate: number
  offsetX: number
  offsetY: number
  opacity: number
  opacityDark: number
}

export interface DotConfig {
  enabled: boolean
  color: string
  opacity: number
  opacityDark: number
  size: number
  radius: number
}

export interface FluidConfig {
  enabled: boolean
  color1: string
  color2: string
  color3: string
  intensity: number
  intensityDark: number
  speed: number
}

export interface ThemeBgConfig {
  light: string
  dark: string
}

export interface AnimConfig {
  duration: number
  parallaxStrength: number
  hoverIntensity: number
  enableParallax: boolean
}

export interface ThemeConfig {
  defaultMode: ThemeMode
  primaryColor: string
  secondaryColor: string
  accentColor: string
  borderRadius: number
  anim: AnimConfig
  bg: ThemeBgConfig
  dots: DotConfig
  fluid: FluidConfig
  watermark: WatermarkConfig
}

export interface ProfileConfig {
  nickname: string
  slogan: string
  bio: string
  github: string
  avatar?: string
  logo?: string
  logoLight?: string
  logoDark?: string
  tags?: string[]
  socials: SocialLink[]
  domains?: DomainLink[]
}

export interface NavMenuItem {
  id: string
  label: string
  path?: string
  url?: string
  icon: string
  color?: string
  external?: boolean
}

export interface NavBrand {
  name: string
  icon: string
}

export interface NavConfig {
  brand: NavBrand
  topMenu: NavMenuItem[]
  topLinks: NavMenuItem[]
  mobileExtraLinks: NavMenuItem[]
}

export interface FooterLink {
  id: string
  label: string
  path?: string
  url?: string
  external?: boolean
}

export interface FooterBrand {
  name: string
  icon: string
  desc: string
}

export interface FilingICP {
  text: string
  url: string
}

export interface FilingPolice {
  text: string
  url: string
  icon?: string
}

export interface FilingConfig {
  icp?: FilingICP
  police?: FilingPolice
}

export interface FooterConfig {
  brand: FooterBrand
  links: FooterLink[]
  copyright: string
  poweredBy?: string
  filing?: FilingConfig
}

export interface LayoutSectionConfig {
  maxWidth: string
}

export interface LayoutConfig {
  hero: LayoutSectionConfig
  siteGrid: LayoutSectionConfig
  footer: LayoutSectionConfig
}

export interface UserPrefs {
  theme: ThemeMode
  pinned: string[]
}
