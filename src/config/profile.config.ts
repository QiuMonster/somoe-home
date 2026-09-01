import type { ProfileConfig } from '@/types/config'

export const profileConfig: ProfileConfig = {
  nickname: 'QiuMonster',                            // 昵称：全站显示的用户名（Hero 区域标题）
  slogan: '在文字的深海里，拾贝而行',                  // 标语：头像下方的个性签名
  bio: 'HI，我是QiuMonster（怪物秋）。是一名全栈开发者 · 设计爱好者 · 内容创作者。\n' +  // 个人简介：Hero 区域详细自我介绍，\n 换行
      '主理 QiuStudio，专注用极简的方式造好用的工具与体验。\n' +
      '个人口号：用代码为世界贡献！',
  github: 'https://github.com/QiuMonster',           // GitHub 主页地址（导航栏 GitHub 按钮链接）
  avatar: '/qiumonster.webp',                         // 头像图片路径（public 目录，留空则使用首字母渐变头像）
  logo: '/logo1024-1500.webp',                        // 默认 Logo 图片路径（public 目录，logoLight/logoDark 优先）
  logoLight: '/logo512-1500-1.webp',                  // 亮色主题 Logo 图片路径（public 目录，亮色模式下导航栏+底部显示）
  logoDark: '/logo512-1500-1_reverse.webp',           // 暗色主题 Logo 图片路径（public 目录，暗色模式下导航栏+底部显示）
  tags: ['内容创作', '开源项目', 'Vue', 'TypeScript', 'Design'], // 身份/技术栈标签（Hero 区域彩色标签展示）

  // 社交链接列表（Hero 区域按钮展示，name=显示名，url=链接，icon=Lucide图标名）
  socials: [
    { name: '主站', url: 'https://qiumonster.com', icon: 'Link' },
    { name: '博客', url: 'https://blog.somoe.xyz', icon: 'BookOpen' },
    { name: 'Gallery', url: 'https://gallery.somoe.xyz', icon: 'BookOpen' },
    { name: 'GBK API', url: 'https://gbk.ink', icon: 'BookOpen' },
    { name: 'QiuStudio', url: 'https://studio.qiumonster.com', icon: 'Layers' },
    { name: 'GitHub', url: 'https://github.com/QiuMonster', icon: 'Github' },
    { name: 'Gitee', url: 'https://gitee.com/QiuMonster', icon: 'GitBranch' },
    { name: '邮箱', url: 'mailto:qiumonster@163.com', icon: 'Mail' },
  ],

  // 域名列表：展示个人拥有的域名，点击可跳转
  domains: [
    { name: 'qiumonster.com', url: 'https://qiumonster.com' },
    { name: 'somoe.xyz', url: 'https://somoe.xyz' },
    { name: 'gbk.ink', url: 'https://gbk.ink' },
  ],
}

export default profileConfig
