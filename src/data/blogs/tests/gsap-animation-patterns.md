---
title: GSAP 动画模式与技巧
description: 整理 GSAP 在 Vue 项目中常用的动画模式，包括入场动画、滚动驱动和交互反馈。
date: 2026-04-12
categories:
  - 前端开发
  - 设计
tags:
  - GSAP
  - 动画
  - Vue
  - 交互设计
author: QiuMonster
---

## GSAP 与 Vue

GSAP 是最强大的 Web 动画库之一，与 Vue 3 配合使用可以创造出流畅的交互体验。

## 常用动画模式

### 入场动画

```typescript
import gsap from 'gsap'

onMounted(() => {
  gsap.fromTo(element, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
  )
})
```

### 交错动画

```typescript
gsap.fromTo(items, 
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out' }
)
```

### 3D 卡片 Hover

```typescript
const quickY = gsap.quickTo(el, 'y', { duration: 0.4 })
const quickRotX = gsap.quickTo(el, 'rotateX', { duration: 0.4 })

function onMove(e: MouseEvent) {
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  quickRotX(px * 12)
}
```

## 性能优化

1. 使用 `will-change` 提升合成层
2. 优先动画 `transform` 和 `opacity`
3. 使用 `gsap.quickTo()` 替代频繁创建 Tween

## 总结

好的动画应该克制而精致，让界面有呼吸感，而不是炫技。
