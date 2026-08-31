import type { ProfileConfig } from '@/types/config'

// ============================================================
// 个人信息配置：昵称、标语、简介、社交、域名、水印、底部文案
// 全站文案一处修改、全局生效
// 数据来源：docx/个人信息.md
// ============================================================

export const profileConfig: ProfileConfig = {
  // 昵称：全站显示的用户名
  nickname: 'QiuMonster',

  // 标语：头像下方的个性签名
  slogan: '在文字的深海里，拾贝而行',

  // 个人简介：Hero 区域的详细自我介绍，支持 \n 换行
  bio: 'HI，我是QiuMonster（怪物秋）。是一名全栈开发者 · 设计爱好者 · 内容创作者。\n' +
      '主理 QiuStudio，专注用极简的方式造好用的工具与体验。',

  // GitHub 主页地址（导航栏 GitHub 按钮链接）
  github: 'https://github.com/QiuMonster',

  // 头像图片路径（public 目录下的文件，留空则使用首字母渐变头像）
  avatar: '/qiumonster.webp',

  // Logo 图片路径（public 目录下的文件，导航栏+底部使用，留空则显示图标+文字）
  logo: '/logo512-1500-1.webp',
  // Logo 暗色模式图片路径（public 目录下的文件，留空则使用 logo）
  logoDark: '/logo512-1500-1_reverse.webp',

  // 身份/技术栈标签（Hero 区域彩色标签展示）
  // tags: ['QiuStudio', 'Vue', 'TypeScript', 'Node.js', 'Design'],
  tags: ['内容创作', '开源项目', 'Vue', 'TypeScript', 'Design'],

  // 社交链接列表（Hero 区域按钮展示，name=显示名，url=链接，icon=Lucide图标名）
  socials: [
    { name: '主站', url: 'https://qiumonster.com', icon: 'Link' },
    { name: '博客', url: 'https://blog.somoe.xyz', icon: 'BookOpen' },
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

  // 导航菜单项（顶部导航栏 + 移动端下拉菜单，按顺序展示）
  nav: [
    { label: '首页', path: '/', color: 'sky', shortLabel: '首' },
    { label: '博客', path: '/blog', color: 'amber', shortLabel: '博' },
    { label: '分类', path: '/category', color: 'emerald', shortLabel: '类' },
    { label: '归档', path: '/archive', color: 'violet', shortLabel: '档' },
    { label: '友链', path: '/friends', color: 'rose', shortLabel: '友' },
  ],

  siteProfile: {
    name: 'Somoe Home',
    url: 'https://somoe.xyz',
    avatar: 'https://somoe.xyz/qiumonster.webp',
    description: '在文字的深海里，拾贝而行',
    rss: 'https://somoe.xyz/rss.xml',
    bg: 'https://somoe.xyz/friend-bg-self.webp',
  },

  // 底部信息
  footer: {
    // 版权文案（底部左侧版权声明）
    copyright: '© 2026 Somoe Home. 保留所有权利。',
    // 站点描述（底部品牌区域一句话简介）
    siteDesc: 'QiuMonster 的内容创作和开源项目的导航站点',
    // 技术支持文案（底部右侧技术驱动声明）
    poweredBy: 'Powered by QiuMonster',
    // 备案信息
    filing: {
      // ICP 备案号
      icp: '皖ICP备2025087176号-2',
      // ICP 备案查询链接
      icpUrl: 'https://beian.miit.gov.cn/',
      // 公网安备号
      police: '皖公网安备341324020000239号',
      // 公网安备查询链接
      policeUrl: 'https://beian.mps.gov.cn/#/query/webSearch?code=341324020000239',
      // 公网安备图标路径（public 目录下的文件）
      policeIcon: '/beian.png',
    },
  },
}

export default profileConfig
