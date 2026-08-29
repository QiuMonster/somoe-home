import gsap from 'gsap'
import { themeConfig } from '@/config/theme.config'

// ============================================================
// 统一 GSAP 动画钩子
// 入场 / 背景流动 / 卡片 hover / 滚动视差 / 顶栏滚动加深
// 全部轻量克制，受 theme.anim 配置（强度/时长）控制
// ============================================================

type Target = gsap.TweenTarget

const anim = () => themeConfig.anim

/** 整体上浮渐入（页面 / 容器） */
function enter(
  target: Target,
  opts: { y?: number; duration?: number; delay?: number; opacity?: number } = {},
) {
  const a = anim()
  return gsap.fromTo(
    target,
    { opacity: opts.opacity ?? 0, y: opts.y ?? 16 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? a.duration,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
    },
  )
}

/** 卡片分组延迟依次浮现 */
function staggerEnter(
  target: Target,
  opts: { y?: number; stagger?: number; duration?: number; delay?: number } = {},
) {
  const a = anim()
  return gsap.fromTo(
    target,
    { opacity: 0, y: opts.y ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? a.duration,
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
    },
  )
}

/** Hero 渐变光斑缓慢漂浮（背景流动） */
function floatBlob(
  target: Target,
  opts: { x?: number; y?: number; scale?: number; duration?: number } = {},
) {
  const a = anim()
  return gsap.to(target, {
    x: opts.x ?? 40,
    y: opts.y ?? 30,
    scale: opts.scale ?? 1.12,
    duration: (opts.duration ?? 8) * a.duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

/** 逐字渐入（文字标题） */
function charsEnter(
  target: Target,
  opts: { stagger?: number; duration?: number; delay?: number } = {},
) {
  const a = anim()
  return gsap.fromTo(
    target,
    { opacity: 0, y: 14, rotateX: -60 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: opts.duration ?? a.duration,
      stagger: opts.stagger ?? 0.045,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
    },
  )
}

/**
 * 卡片 hover 3D 上浮联动
 * 返回事件绑定对象，由组件挂到 @mouseenter / @mousemove / @mouseleave
 */
function bindCardHover(el: HTMLElement, intensity = 0.5) {
  const lift = 6 + intensity * 8 // 上浮 px
  const maxTilt = 4 + intensity * 6 // 倾斜 deg

  const setY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
  const setRotX = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3.out' })
  const setRotY = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3.out' })

  function onMove(e: MouseEvent) {
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setY(-lift)
    setRotX(-py * maxTilt * 2)
    setRotY(px * maxTilt * 2)
  }
  function onEnter() {
    gsap.to(el, { boxShadow: '0 18px 50px -16px rgba(79,144,205,0.45)', duration: 0.4 })
  }
  function onLeave() {
    setY(0)
    setRotX(0)
    setRotY(0)
    gsap.to(el, { boxShadow: '0 4px 24px -8px rgba(0,0,0,0.12)', duration: 0.5 })
  }

  return { onEnter, onMove, onLeave }
}

/** 滚动视差：元素随滚动轻微跟随浮动 */
function bindParallax(el: HTMLElement, strength = 0.12) {
  const setY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' })
  function onScroll() {
    const r = el.getBoundingClientRect()
    const center = r.top + r.height / 2
    const vh = window.innerHeight
    const progress = (center - vh / 2) / vh // -0.5 ~ 0.5 视口中心上下
    setY(-progress * 80 * strength * 2)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

export function useGsapAnim() {
  return {
    enter,
    staggerEnter,
    floatBlob,
    charsEnter,
    bindCardHover,
    bindParallax,
  }
}
