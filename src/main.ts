import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'normalize.css'

import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'

// createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
const app = createApp(App)
// 注册全局的属性
app.use(globalRegister)
// 使用elementPlus以及将组件内容进行国际化
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store)
// 用户登录后刷新，重新存储vuex的数据,动态注册路由
setupStore()
// 路由匹配
app.use(router)

app.mount('#app')
