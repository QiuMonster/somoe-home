/** @type {import('tailwindcss').Config} */

// 主题色采用 CSS 变量驱动（RGB 三元组），支持暗色平滑切换与透明度通道
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--color-bg-soft) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-text-faint) / <alpha-value>)',
        },
        line: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgb(var(--color-shadow) / 0.18)',
        float: '0 18px 50px -16px rgb(var(--color-shadow) / 0.28)',
        glow: '0 0 0 1px rgb(var(--color-primary) / 0.16), 0 8px 30px -6px rgb(var(--color-primary) / 0.22)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, rgb(var(--color-primary) / 0.95), rgb(var(--color-secondary) / 0.95))',
        'gradient-mist': 'linear-gradient(180deg, rgb(var(--color-bg-soft) / 0.6), rgb(var(--color-bg) / 0))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-4deg)' },
          '30%': { transform: 'rotate(4deg)' },
          '45%': { transform: 'rotate(-2deg)' },
          '60%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '90%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 6s linear infinite',
        wiggle: 'wiggle 0.6s ease-in-out',
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        liquid: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
