---
title: 前端性能优化全景
description: 系统性梳理前端性能优化的各个方面，从网络请求到渲染管线，构建完整的性能优化知识体系。
date: 2026-02-28
categories:
  - 前端开发
tags:
  - 性能优化
  - Web Vitals
  - Lighthouse
  - 最佳实践
author: QiuMonster
---

## Core Web Vitals

- **LCP**（Largest Contentful Paint）< 2.5s
- **INP**（Interaction to Next Paint）< 200ms
- **CLS**（Cumulative Layout Shift）< 0.1

## 网络层优化

1. HTTP/2 多路复用
2. 资源预加载（preload / prefetch）
3. CDN 加速静态资源
4. 图片格式升级（WebP / AVIF）

## 渲染层优化

1. 减少 DOM 节点数量
2. 避免强制同步布局
3. 使用 CSS containment
4. 虚拟滚动处理长列表

## 构建层优化

1. Code Splitting + 懒加载
2. Tree Shaking 移除死代码
3. 压缩 JS/CSS/HTML
4. 分析 Bundle 体积

## 监控体系

建立 RUM（Real User Monitoring）系统，持续追踪真实用户体验。
