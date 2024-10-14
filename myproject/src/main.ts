import './public/base.css'
import 'amfe-flexible'
import 'vant/lib/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'
import Vant from 'vant';
// 导入存储库
// import store from './stores/index'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vant)
// app.use(store)
app.mount('#app')
