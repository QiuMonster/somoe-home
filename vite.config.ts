import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Inspector from 'unplugin-vue-dev-locator/vite'
import viteRssPlugin from './vite-plugin-rss'
import { blogConfig } from './src/config/blog.config'

const rssDataDir = blogConfig.dataDir.replace(/^\//, '')

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    vue(),
    Inspector(),
    viteRssPlugin('https://somoe.xyz', rssDataDir),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
