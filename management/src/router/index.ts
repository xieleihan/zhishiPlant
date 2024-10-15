import { createWebHashHistory, createRouter } from 'vue-router'

import StartPages from '../views/StartpagesView.vue'

const routes = [
  {
    path: '/',
    redirect: '/startpages'
  },
  {
    path: '/startpages',
    name: 'StartPages',
    component: StartPages
  }
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router