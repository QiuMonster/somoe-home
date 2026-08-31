---
title: Git 工作流与分支策略
description: 总结团队项目中 Git 分支管理的最佳实践，包括 Git Flow、Trunk Based 和 PR 工作流。
date: 2026-03-05
categories:
  - DevOps
tags:
  - Git
  - 版本控制
  - 团队协作
  - 工作流
author: QiuMonster
---

## 常见分支策略

### Git Flow

适合发布周期长的项目：main / develop / feature / release / hotfix。

### Trunk Based

适合持续部署的团队：所有人向 main 提交，短生命周期 feature 分支。

### PR 工作流

Fork → Branch → PR → Review → Merge，开源项目标配。

## 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档变更
style: 格式调整
refactor: 重构
test: 测试
chore: 构建/工具
```

## 实用技巧

1. `git stash` 暂存工作区
2. `git rebase -i` 压缩提交
3. `git bisect` 二分查找 bug 引入点
4. `git reflog` 找回丢失的提交
