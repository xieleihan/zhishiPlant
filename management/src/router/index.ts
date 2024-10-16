import { createWebHashHistory, createRouter } from 'vue-router';
// import StartPages from '../views/StartpagesView.vue';  // 使用 PascalCase 作为变量名称

const routes = [
  {
    path: '/',
    redirect: '/startpages'
  },
  {
    path: '/startpages',
    name: 'StartPages',
    component: () => import('../views/StartpagesView.vue')  // 对应的组件名称使用正确的变量
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('../views/ManagementView.vue')  // 这里使用 component 而不是 components
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/management') {
    // sessionStorage 中如果没有 'token'，或者它是空字符串，应该跳转到 '/startpages'
    const token = sessionStorage.getItem('token');
    if (!token) {
      return next({ path: '/startpages' });
    }
  }
  // 继续执行导航
  next();
});

export default router;
