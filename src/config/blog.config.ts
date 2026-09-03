/** 博客列表加载模式：scroll 滚动无限加载 | pagination 分页导航 */
export type BlogLoadMode = 'scroll' | 'pagination'

export interface BlogConfig {
  /** 博客列表展示列数（1~4） */
  columns: number
  /** 博客列表加载模式 */
  loadMode: BlogLoadMode
  /** 分页模式下每页文章数，滚动模式下每次加载文章数 */
  pageSize: number
  /** 博客详情页是否展示右侧目录 */
  toc: boolean
  /** 目录点击定位时与顶部的距离（px） */
  tocOffset: number
  /** 分类按钮 hover 是否启用抖动动效 */
  categoryWiggle: boolean
  /** 分页按钮 hover 是否启用抖动动效 */
  paginationWiggle: boolean
  /** 归档页文章是否展示简介 */
  archiveShowDesc: boolean
  /** 归档页文章 hover 是否启用彩色背景和文字高亮 */
  archiveColorHover: boolean
  /** 版权声明配置 */
  copyright: {
    /** 站点名称 */
    siteName: string
    /** 作者名称 */
    author: string
    /** 许可协议名称 */
    license: string
    /** 许可协议链接 */
    licenseUrl: string
    /** 附加声明行 */
    notices: string[]
  }
  /** 博客数据根路径（Vite glob 需同步修改） */
  dataDir: string
}

export const blogConfig: BlogConfig = {
  // 博客列表展示列数（1~4）
  columns: 3,
  // 博客列表加载模式：scroll 滚动无限加载 | pagination 分页导航
  loadMode: 'pagination',
  // 分页模式下每页文章数，滚动模式下每次加载文章数
  pageSize: 12,
  // 博客详情页是否展示右侧目录
  toc: true,
  // 目录点击定位时与顶部的距离（px）
  tocOffset: 200,
  // 分类按钮 hover 是否启用抖动动效
  categoryWiggle: false,
  // 分页按钮 hover 是否启用抖动动效
  paginationWiggle: false,
  // 归档页文章是否展示简介
  archiveShowDesc: true,
  // 归档页文章 hover 是否启用彩色背景和文字高亮
  archiveColorHover: true,
  // 版权声明配置
  copyright: {
    // 站点名称
    siteName: 'Somoe Home',
    // 作者名称
    author: 'QiuMonster',
    // 许可协议名称
    license: 'CC BY-NC-SA 4.0',
    // 许可协议链接
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    // 附加声明行
    notices: [
      '转载请注明出处及原作者',
      '严禁商业用途',
      '禁止修改或再创作',
    ],
  },
  dataDir: '/src/data/blogs',
  // dataDir: '/src/data/self',
}

export default blogConfig
