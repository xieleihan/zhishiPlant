import { createWebHashHistory, createRouter } from 'vue-router'

import StartPages from '../views/StartPagesView.vue'
import { useHomeStore } from '../stores/home'

const routes = [
  {
    path: '/',
    redirect: '/startpages'
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
    component:() => import('../views/DiscoverView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component:() => import('../views/UserView.vue')

  },
  {
    path: '/startpages',
    name: 'startpages',
    component: StartPages,
  },
  {
    path: '/login',
    name: 'login',
    components: { StartPages: () => import('../views/secoundPages/LoginView.vue') },
    children: [
      {
        path: 'format',
        name: 'format',
        components: { update: () => import('../views/secoundPages/FormatPassword.vue')}
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    components: {StartPages:() => import('../views/secoundPages/RegisterView.vue')}
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
  if (to.name === 'startpages') {
    homeStore.open();
    
  }
});

export default router