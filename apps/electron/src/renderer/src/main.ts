import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' // 引入ElementPlus 组件
import 'element-plus/dist/index.css' // 引入ElementPlus 组件样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(pinia).use(router as any).use(ElementPlus as any).mount('#app')