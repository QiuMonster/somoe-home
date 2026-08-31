---
title: TypeScript 高级类型体操
description: 深入 TypeScript 条件类型、映射类型和模板字面量类型，掌握类型编程的核心技巧。
date: 2026-04-25
categories:
  - 前端开发
  - 编程语言
tags:
  - TypeScript
  - 类型系统
  - 高级技巧
author: QiuMonster
---

## 条件类型

```typescript
type IsString<T> = T extends string ? true : false
type A = IsString<'hello'> // true
type B = IsString<42>      // false
```

## 映射类型

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K]
}
```

## 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`
type ClickEvent = EventName<'click'> // 'onClick'
```

## 实战应用

用类型体操构建类型安全的 API 请求层，让错误在编译期暴露。
