import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' // ����ElementPlus ���
import 'element-plus/dist/index.css' // ����ElementPlus �����ʽ
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(pinia).use(router as any).use(ElementPlus as any).mount('#app')