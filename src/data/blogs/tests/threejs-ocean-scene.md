---
title: Three.js 深海场景渲染
description: 使用 Three.js 创建沉浸式深海探索场景，从光照模型到后处理效果的完整实现。
date: 2026-06-18
updated: 2026-06-25
categories:
  - 3D开发
  - 前端开发
tags:
  - Three.js
  - WebGL
  - 3D
  - Shader
author: QiuMonster
---

## 项目背景

深海探索是一个 Three.js 实验项目，目标是创建一个从阳光区到深渊区的沉浸式海底场景。

## 技术实现

### 场景搭建

```typescript
import * as THREE from 'three'

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x001122, 0.02)
scene.background = new THREE.Color(0x001122)
```

### 水面效果

使用 Shader 实现动态水面：

```glsl
// vertex shader
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// fragment shader
uniform float uTime;
void main() {
  vec2 uv = vUv;
  float wave = sin(uv.x * 10.0 + uTime) * 0.02;
  gl_FragColor = vec4(0.1, 0.3, 0.6, 0.7 + wave);
}
```

### 光照系统

深海光照需要考虑：

- 阳光区：强烈的方向光
- 暮光区：微弱的环境光
- 深渊区：仅自发光

## 总结

Three.js 让 WebGL 开发变得触手可及，结合 Shader 可以创造出令人惊叹的视觉效果。
