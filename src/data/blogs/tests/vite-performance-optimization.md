---
title: Vite 项目性能优化实战
description: 从构建速度到运行时性能，全方位优化 Vite 项目的实用技巧与经验分享。
date: 2026-07-10
categories:
  - 前端开发
tags:
  - Vite
  - 性能优化
  - 构建工具
author: QiuMonster
---

## 构建速度优化

### 依赖预构建

Vite 会自动预构建依赖，但有时需要手动配置：

```typescript
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router', 'gsap']
  }
})
```

### 代码分割

使用动态导入实现路由级别的代码分割：

```typescript
const routes = [
  {
    path: '/blog',
    component: () => import('@/views/BlogView.vue')
  }
]
```

## 运行时优化

### 图片优化

- 使用 WebP 格式
- 懒加载 `loading="lazy"`
- 响应式图片 `srcset`

### Bundle 分析

```bash
npx vite-bundle-visualizer
```

## 总结

性能优化是一个持续的过程，定期检测、逐步改进是最佳策略。
