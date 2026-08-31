---
title: Vue 3 Composition API 实践指南
description: 深入理解 Vue 3 Composition API 的核心概念与最佳实践，从 setup 函数到自定义 Hooks 的完整教程。
date: 2026-08-15
updated: 2026-08-20
categories:
  - 前端开发
tags:
  - Vue3
  - Composition API
  - TypeScript
author: QiuMonster
---

## 前言

Vue 3 的 Composition API 是一次范式转换，它让我们能够以更灵活、更可组合的方式组织组件逻辑。

## 核心概念

### setup 函数

`setup` 是 Composition API 的入口点，在组件创建之前执行：

```typescript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    onMounted(() => console.log('mounted!'))
    return { count, increment }
  }
}
```

### 响应式基础

- **ref**：用于基本类型的响应式数据
- **reactive**：用于对象类型的响应式数据
- **computed**：计算属性

```typescript
const count = ref(0)
const state = reactive({ name: 'QiuMonster' })
const doubled = computed(() => count.value * 2)
```

### 自定义 Hooks

将逻辑抽取为可复用的组合函数：

```typescript
// hooks/useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}
```

## 最佳实践

1. 优先使用 `ref` 而非 `reactive`，避免解构丢失响应性
2. 以 `use` 前缀命名自定义 Hooks
3. 在 `setup` 中尽早返回模板需要的数据
4. 使用 `onMounted` 等生命周期钩子替代 Options API 的写法

## 总结

Composition API 让代码更易复用、更易测试，是 Vue 3 项目开发的推荐方式。
