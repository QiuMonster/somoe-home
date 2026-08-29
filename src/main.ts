import { createApp } from 'vue'
import './assets/style/global.css'
import App from './App.vue'
import router from './router'

const version = __APP_VERSION__
const repo = 'https://github.com/QiuMonster/somoe-home'

// console.log(
//   `%c\n  ╔══════════════════════════════════╗\n  ║                                  ║\n  ║       🏠  Somoe Home             ║\n  ║                                  ║\n  ║   Powered by QiuMonster          ║\n  ║   v${version}                       ║\n  ║   ${repo}  ║\n  ║                                  ║\n  ╚══════════════════════════════════╝\n`,
//   'color: #4F94CD; font-weight: bold; font-size: 14px; line-height: 1.4;',
// )

console.log(
  '%c🚀 Somoe Home %cv' + version + ' %c' + repo,
  'background: #4F94CD; color: #fff; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
  'background: #333; color: #fff; padding: 4px 8px; font-weight: bold;',
  'background: #64C2A6; color: #fff; padding: 4px 8px; border-radius: 0 4px 4px 0;',
)

createApp(App).use(router).mount('#app')
