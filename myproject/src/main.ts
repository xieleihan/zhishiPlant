import './public/base.css'
import 'amfe-flexible'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'
// 导入存储库
// import store from './stores/index'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
// app.use(store)
app.mount('#app')
