# Somoe Home

> Somoe Home — QiuMonster 创建的个人聚合门户，汇聚内容创作、开源项目与工具站点。

## 简介

Somoe Home 是一个极简液态轻拟物风格的个人聚合门户主页，由 [QiuMonster](https://github.com/QiuMonster) 主理。站点将个人项目、开源仓库、博客创作、社交平台和常用服务统一聚合展示，一键触达。

### 特性

- **液态轻拟物风格** — 磨砂玻璃质感卡片 + 雾蓝青渐变主色 + 波点纹理 + GLSL 流体背景
- **暗色 / 亮色主题** — 跟随系统自动切换，支持手动切换，切换过程平滑过渡
- **GLSL 流体着色器** — WebGL 驱动的液态水银流体背景，着色器文件独立可切换
- **波点 + 流体分层** — CSS 波点层与 Canvas 流体层分离，配置驱动可独立开关
- **配置驱动** — 背景/波点/流体/水印/动效参数全部配置化，逐行注释
- **站点置顶** — 支持置顶常用站点，偏好本地持久化
- **搜索过滤** — 实时搜索站点名称、描述与标签
- **动效调节** — 可调节入场时长、视差强度、Hover 强度
- **GSAP 入场动画** — Hero 区域协调入场动效 + 卡片 3D hover 效果
- **移动端适配** — 响应式布局，移动端下拉菜单，友链卡片网格自适应
- **水印效果** — Hero 区域超大半透明水印文字，CSS 变量驱动
- **域名展示** — 个人域名一行展示，蓝色下划线分隔
- **社交按钮** — 彩色边框 + hover 填充反转 + 边缘高光动效
- **完全静态** — 纯前端 SPA，可部署到任意静态托管平台

## 技术栈

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架（Composition API + `<script setup>`） |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Vite](https://vitejs.dev/) | 构建工具 |
| [TailwindCSS](https://tailwindcss.com/) | 原子化 CSS |
| [Lucide](https://lucide.dev/) | 图标库 |
| [GSAP](https://gsap.com/) | 入场动画与交互动效 |
| [WebGL / GLSL](https://www.khronos.org/webgl/) | 流体着色器背景 |

## 项目结构

```
somoe_home/
├── public/                   # 静态资源（头像、logo、favicon、数据文件）
│   └── data/
│       └── friends.json5     # 友链数据
├── src/
│   ├── assets/
│   │   ├── shaders/          # GLSL 着色器文件
│   │   │   ├── base.vert     # 顶点着色器
│   │   │   ├── fluid.frag    # 透明流体片元着色器
│   │   │   ├── 1.frag        # 液态水银着色器（当前使用）
│   │   │   └── fluid-dots.frag # 旧版波点+流体合一着色器
│   │   └── style/
│   │       └── global.css    # 全局样式、主题变量、CSS 组件
│   ├── components/
│   │   ├── base/             # 基础组件
│   │   │   ├── FluidCanvas.vue  # GLSL 流体 Canvas 组件
│   │   │   ├── SCard.vue     # 站点卡片
│   │   │   ├── SIcon.vue     # Lucide 图标封装
│   │   │   ├── STheme.vue    # 主题切换
│   │   │   └── STransition.vue # 过渡动画
│   │   └── layout/           # 布局组件
│   │       ├── Navbar.vue    # 顶部导航（桌面+移动端）
│   │       ├── Hero.vue      # 个人信息首屏
│   │       ├── SiteGrid.vue  # 站点网格
│   │       └── Footer.vue    # 底部信息
│   ├── config/
│   │   ├── profile.config.ts # 个人信息配置（昵称/简介/社交/域名/logo）
│   │   ├── site.config.ts    # 站点分类与项目数据
│   │   └── theme.config.ts   # 主题/背景/波点/流体/水印/动效配置
│   ├── hooks/
│   │   ├── useConfig.ts      # 全局配置读取
│   │   ├── useGsapAnim.ts    # GSAP 动画钩子
│   │   └── useTheme.ts       # 主题切换逻辑
│   ├── types/
│   │   └── config.d.ts       # TS 类型定义
│   ├── views/
│   │   ├── HomeView.vue      # 首页
│   │   └── FriendsView.vue   # 友链页
│   ├── router/
│   │   └── index.ts          # 路由配置
│   ├── App.vue               # 根组件（三层结构：流体+波点+内容）
│   └── main.ts               # 入口
├── index.html                # HTML 模板（含 SEO meta）
├── tailwind.config.js        # Tailwind 配置
├── vite.config.ts            # Vite 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm（推荐）/ npm / yarn

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

浏览器打开 `http://localhost:5173` 即可预览。

### 构建生产

```bash
pnpm build
```

输出目录为 `dist/`，可直接部署到 Vercel、Cloudflare Pages、Netlify 等静态托管平台。

### 预览构建产物

```bash
pnpm preview
```

## 自定义配置

### 修改个人信息

编辑 `src/config/profile.config.ts`：

```ts
export const profileConfig: ProfileConfig = {
  nickname: 'YourName',
  slogan: '你的个性标语',
  bio: '你的个人简介，支持 \\n 换行',
  github: 'https://github.com/yourname',
  avatar: '/your-avatar.jpg',   // 放入 public/ 目录
  logo: '/your-logo.png',       // 导航栏+底部logo，放入 public/ 目录
  tags: ['标签1', '标签2'],
  socials: [
    { name: 'GitHub', url: 'https://github.com/yourname', icon: 'Github' },
  ],
  domains: [
    { name: 'example.com', url: 'https://example.com' },
  ],
  footer: {
    techStack: ['Vue3', 'TypeScript'],
    copyright: '© 2026 YourName',
    signature: 'Your signature.',
  },
}
```

### 修改主题与背景

编辑 `src/config/theme.config.ts`，所有参数逐行注释：

```ts
export const themeConfig: ThemeConfig = {
  defaultMode: 'auto',           // auto / light / dark
  primaryColor: '#4F94CD',       // 主色
  bg: {
    light: '244 247 248',        // 亮色背景（RGB，供着色器读取）
    dark: '12 16 19',            // 暗色背景
  },
  dots: {
    enabled: true,               // 波点开关
    opacity: 0.14,               // 亮色透明度
    opacityDark: 0.08,           // 暗色透明度
    size: 16,                    // 间距（px）
    radius: 0.6,                 // 半径（px）
  },
  fluid: {
    enabled: true,               // 流体开关
    intensity: 0.25,             // 亮色可见度
    intensityDark: 0.18,         // 暗色可见度
    speed: 0.15,                 // 流速
  },
  watermark: {
    enabled: true,               // 水印开关
    text: 'YourName',            // 水印文字
    fontSize: 16,                // 字体大小（vw）
    rotate: -12,                 // 旋转角度
    opacity: 0.02,               // 透明度
  },
}
```

### 切换流体着色器

着色器文件位于 `src/assets/shaders/`，在 `src/App.vue` 中切换 import：

```ts
// 使用液态水银着色器
import customFrag from '@/assets/shaders/1.frag?raw'

// 使用透明流体着色器
import customFrag from '@/assets/shaders/fluid.frag?raw'
```

着色器支持 `u_bg`（背景色）和 `u_fluidAlpha`（可见度）uniform，可响应暗色/亮色切换。

### 修改站点项目数据

编辑 `src/config/site.config.ts`，自由增删分类与站点项：

```ts
{
  id: 'my-category',
  name: '分类名称',
  icon: 'Rocket',       // Lucide 图标名
  desc: '分类描述',
  items: [
    {
      id: 'unique-id',
      title: '站点名称',
      description: '站点描述',
      url: 'https://example.com',
      icon: 'Globe',     // Lucide 图标名
      tags: ['标签'],
      pinned: true,      // 是否置顶
    },
  ],
}
```

新增图标时，在 `src/components/base/SIcon.vue` 中补充 import 和注册即可。

### 修改友链数据

编辑 `public/data/friends.json5`，每项包含 `name`、`url`、`avatar`、`description`、`bg` 字段。

## 部署

### Vercel

1. Fork 或导入本仓库
2. Vercel 自动识别 Vite 项目，无需额外配置
3. 构建命令：`pnpm build`，输出目录：`dist`

### Cloudflare Pages

1. 连接 Git 仓库
2. 构建命令：`pnpm build`
3. 输出目录：`dist`

### 自托管

```bash
pnpm build
# 将 dist/ 目录部署到任意 Web 服务器
```

## 许可证

[MIT](./LICENSE) © QiuMonster

## 链接

- **Somoe Home**：[https://somoe.xyz](https://somoe.xyz)
- **QiuMonster 主站**：[https://qiumonster.com](https://qiumonster.com)
- **QiuMonster GitHub**：[https://github.com/QiuMonster](https://github.com/QiuMonster)
- **QiuStudio**：[https://studio.qiumonster.com](https://studio.qiumonster.com)
- **Ocean Blog**：[https://blog.somoe.xyz](https://blog.somoe.xyz)
- **开源仓库**：[https://github.com/QiuMonster/somoe-home](https://github.com/QiuMonster/somoe-home)
