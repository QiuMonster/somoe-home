---
title: 用 TailwindCSS 构建设计系统
description: 探索如何使用 TailwindCSS 构建一致性的设计系统，从色彩规范到组件库的完整流程。
date: 2026-07-22
categories:
  - 前端开发
  - 设计
tags:
  - TailwindCSS
  - 设计系统
  - CSS
author: QiuMonster
---

## 为什么需要设计系统？

设计系统是产品一致性的基石，它确保团队成员在构建界面时遵循统一的视觉规范和交互规则。

## TailwindCSS 与设计系统

TailwindCSS 的原子化 CSS 方法天然适合构建设计系统：

### 色彩规范

在 `tailwind.config.js` 中定义主题色：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(79 144 205)',    // 雾蓝
        secondary: 'rgb(100 194 166)',  // 青绿
        accent: 'rgb(232 220 202)',     // 鎏金
      }
    }
  }
}
```

### 间距与排版

```javascript
spacing: {
  'xs': '0.25rem',
  'sm': '0.5rem',
  'md': '1rem',
  'lg': '1.5rem',
  'xl': '2rem',
}
```

## 组件抽象

使用 TailwindCSS 的 `@apply` 指令或组件化方式抽象常用样式：

```css
.btn-primary {
  @apply rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all;
}
```

## 总结

TailwindCSS + 设计系统 = 高效、一致、可维护的前端开发体验。
