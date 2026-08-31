---
title: CSS 容器查询实战
description: 深入理解 CSS Container Queries，实现真正基于容器尺寸的响应式组件设计。
date: 2026-05-08
categories:
  - 前端开发
  - 设计
tags:
  - CSS
  - 响应式
  - 容器查询
author: QiuMonster
---

## 从媒体查询到容器查询

媒体查询基于视口，容器查询基于父容器——这才是组件级响应式的正确方式。

## 基本用法

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card { flex-direction: column; }
}
```

## 与组件框架结合

在 Vue/React 中，容器查询让组件不再依赖外部布局，实现真正的封装。

## 浏览器支持

2024 年起所有主流浏览器均已支持，可以放心使用。
