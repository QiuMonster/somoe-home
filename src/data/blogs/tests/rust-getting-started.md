---
title: Rust 入门笔记
description: 从 JavaScript 开发者的视角入门 Rust，记录所有权、生命周期和类型系统带来的思维转变。
date: 2026-06-01
categories:
  - 编程语言
tags:
  - Rust
  - 系统编程
  - 学习笔记
author: QiuMonster
---

## 为什么学 Rust

作为一个前端开发者，学 Rust 不是为了转行，而是为了理解内存安全与系统级编程的思维方式。

## 所有权系统

Rust 最核心的概念——所有权：

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 的所有权转移给 s2
    // println!("{}", s1); // 编译错误！s1 已失效
    println!("{}", s2);
}
```

## 借用与引用

不可变引用 `&T` 和可变引用 `&mut T`，同一时刻只能存在其一。

## 感受

Rust 的编译器像一个严格的老师，但它帮你避免了大量的运行时 bug。
