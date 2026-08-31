---
title: WebGL 着色器入门
description: 从零开始学习 GLSL 着色器编程，理解顶点着色器与片元着色器的工作原理。
date: 2026-04-03
categories:
  - 前端开发
  - 图形学
tags:
  - WebGL
  - GLSL
  - 着色器
  - 图形编程
author: QiuMonster
---

## 着色器是什么

着色器是运行在 GPU 上的小程序，分为顶点着色器和片元着色器。

## 第一个片元着色器

```glsl
uniform float uTime;
uniform vec2 uResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 color = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
}
```

## 关键概念

- **Uniform**：CPU 传给 GPU 的全局变量
- **Varying**：顶点着色器传给片元着色器的插值变量
- **Attribute**：每个顶点的输入数据

## 学习路径

1. 理解坐标系统与向量运算
2. 掌握内置函数（sin, cos, mix, smoothstep）
3. 学习噪声函数与 SDF
4. 实践 Shadertoy 作品
