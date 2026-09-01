import type { ThemeConfig } from '@/types/config'

// ============================================================
// 主题 / 色彩 / 动效 / 背景 全局配置
// 开源使用者可在此一键切换全站风格强度
// ============================================================

export const themeConfig: ThemeConfig = {
  // 主题模式：auto 跟随系统偏好；light 强制亮色；dark 强制暗色
  defaultMode: 'auto',

  // 品牌识别色
  primaryColor: '#4F94CD',       // 主色：雾蓝
  secondaryColor: '#64C2A6',     // 副色：青绿
  accentColor: '#E8DCCA',        // 点缀：极淡鎏金

  // 卡片圆角大小（px）
  borderRadius: 20,

  // 动效参数
  anim: {
    duration: 0.7,               // 入场动画基准时长（秒）
    parallaxStrength: 0.12,      // 视差位移强度（0~1）
    hoverIntensity: 0.5,         // hover 上浮强度（0~1）
    enableParallax: true,        // 是否启用滚动视差
  },

  // 页面背景色（RGB 三元组字符串，供 GLSL 着色器读取）
  bg: {
    light: '244 247 248',        // 亮色主题背景色：薄雾白
    dark: '12 16 19',            // 暗色主题背景色：淡墨黑
  },

  // 背景波点配置
  dots: {
    enabled: true,               // 是否启用波点（false 则不渲染波点层）
    color: '79 144 205',         // 波点颜色（RGB 三元组字符串，默认跟随主色雾蓝）
    opacity: 0.14,               // 亮色主题波点透明度（0~1，值越小越淡）
    opacityDark: 0.08,           // 暗色主题波点透明度（暗色下适当降低避免刺眼）
    size: 16,                    // 波点网格间距（px，值越大点越稀疏）
    radius: 0.6,                 // 波点半径（px，值越大点越粗）
  },

  // 背景动态流体配置（GLSL 着色器，叠加在波点之上）
  fluid: {
    enabled: true,               // 是否启用流体效果（false 则仅显示波点背景）
    color1: '79 144 205',        // 流体颜色1：雾蓝（RGB 三元组字符串）
    color2: '100 194 166',       // 流体颜色2：青绿
    color3: '232 220 202',       // 流体颜色3：鎏金
    intensity: 0.25,             // 亮色主题流体透明度（0~1，值越小越淡）
    intensityDark: 0.18,         // 暗色主题流体透明度（暗色下可适当降低）
    speed: 0.15,                 // 流体流速（0~1，0 为完全静止）
  },

  // 水印配置：Hero 区域背景超大半透明水印文字，通过 CSS 变量驱动
  watermark: {
    enabled: true,               // 是否启用水印（false 则不显示）
    text: 'QiuMonster',          // 水印文字内容
    fontSize: 16,                // 字体大小（vw 视口宽度单位，值越大字越大）
    rotate: -12,                 // 旋转角度（负数逆时针，正数顺时针）
    offsetX: 0,                  // 水平偏移（vw，0 为居中，正值右移，负值左移）
    offsetY: 0,                  // 垂直偏移（vh，0 为居中，正值下移，负值上移）
    opacity: 0.02,               // 亮色主题透明度（0~1，值越小越淡）
    opacityDark: 0.02,           // 暗色主题透明度（暗色下可适当调大以保持可见）
  },
}

export default themeConfig
