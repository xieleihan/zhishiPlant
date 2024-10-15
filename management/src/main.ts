import './public/base.css'
import 'vant/lib/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vant from 'vant';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant);
app.mount('#app')
