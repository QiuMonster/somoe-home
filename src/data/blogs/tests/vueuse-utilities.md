---
title: VueUse 工具库实践
description: 整理 VueUse 中最实用的组合式函数，提升 Vue 3 项目的开发效率与代码质量。
date: 2026-03-18
categories:
  - 前端开发
tags:
  - Vue
  - VueUse
  - 工具库
  - Composition API
author: QiuMonster
---

## 为什么用 VueUse

VueUse 是 Vue 生态的 lodash，提供了 200+ 经过测试的组合式函数。

## 常用函数

### useDark

```typescript
const isDark = useDark()
const toggleDark = useToggle(isDark)
```

### useIntersectionObserver

```typescript
const target = ref(null)
const isVisible = ref(false)

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})
```

### useStorage

```typescript
const state = useStorage('app-settings', {
  theme: 'light',
  fontSize: 14,
})
```

### useMouse

```typescript
const { x, y } = useMouse()
```

## 最佳实践

1. 按需引入，避免全量导入
2. 结合 `ref` 自动解包特性
3. 善用 `computed` 派生状态
