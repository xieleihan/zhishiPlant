import { createWebHashHistory, createRouter } from 'vue-router'

import StartPages from '../views/StartPagesView.vue'
import { useHomeStore } from '../stores/home'

const routes = [
  {
    path: '/',
    name: 'default',
    component: StartPages
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('../views/InformationView.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/DiscoverView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})



// 添加全局后置守卫
router.afterEach((to,from) => {
  const homeStore = useHomeStore();

  // 返回到 / 或 /startpages，执行 homeStore.close()
  if (to.name === 'startpages' || to.name === 'default') {
    homeStore.toggle();
    
  }
});

export default router