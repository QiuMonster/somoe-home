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
  // 博客数据根路径（对应 src/data 下的目录名）
  dataDir: '/src/data/blogs',
  // dataDir: '/src/data/self',
}

export default blogConfig
