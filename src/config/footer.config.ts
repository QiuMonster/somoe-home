import type { FooterConfig } from '@/types/config'

export const footerConfig: FooterConfig = {
  // 底部品牌标识配置（左侧品牌区域）
  brand: {
    name: 'Somoe Home',          // 品牌名称，显示在 Logo 图标右侧
    icon: 'Sparkles',            // 品牌 Lucide 图标名（无 Logo 图片时作为兜底图标）
    desc: '个人导航站点',         // 品牌描述文字，显示在品牌名称下方
  },

  // 底部导航链接列表（右侧导航区域，支持站内路由与外部链接）
  links: [
    {
      id: 'home',                // 链接唯一标识
      label: '首页',             // 链接显示文字
      path: '/',                 // 站内路由路径（与 url 二选一，path 优先渲染为 router-link）
    },
  ],

  // 版权声明文案
  copyright: '© 2026 Somoe Home. Open‑source under MIT License.',

  // 驱动/致谢文案（显示在版权声明右侧）
  poweredBy: 'Powered by QiuMonster',

  // 备案信息配置（根据实际需要填写，留空则不显示对应备案条目）
  filing: {
    // ICP 备案信息（工信部备案）
    icp: {
      text: '京ICP备XXXXXXXX号-X',       // ICP 备案号文案（模板占位，请替换为真实备案号）
      url: 'https://beian.miit.gov.cn/',  // ICP 备案查询链接
    },
    // 公安备案信息（公安部备案）
    police: {
      text: '京公网安备XXXXXXXXXXXXXX号',  // 公安备案号文案（模板占位，请替换为真实备案号）
      url: 'https://beian.mps.gov.cn/#/query/webSearch?code=XXXXXXXXXXXXXX', // 公安备案查询链接
      icon: '/beian.png',                   // 公安备案图标路径（public 目录下）
    },
  },
}

export default footerConfig
