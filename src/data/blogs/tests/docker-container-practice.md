---
title: Docker 容器化实践
description: 记录 Docker 在前端项目部署中的实践，包括镜像构建优化、多阶段构建与 CI 集成。
date: 2026-05-20
categories:
  - DevOps
  - 前端开发
tags:
  - Docker
  - 容器化
  - CI/CD
  - 部署
author: QiuMonster
---

## 为什么用 Docker

一致的环境 = 更少的"在我机器上能跑"问题。

## 多阶段构建

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

## 镜像优化技巧

1. 使用 Alpine 基础镜像
2. 利用 .dockerignore 排除无关文件
3. 合并 RUN 指令减少层数
4. 利用构建缓存，先 COPY package.json 再 COPY 源码

## CI 集成

在 GitHub Actions 中构建并推送镜像，实现自动化部署。
