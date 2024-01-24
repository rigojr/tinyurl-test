import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    'path': '/',
    'name': 'sign-in',
    'component': () => import('@/views/SignInView.vue')
  },
  {
    'path': '/faq',
    'name': 'faq',
    'component': () => import('@/views/FaqView.vue')
  },
  {
    'path': '/articles',
    'name': 'articles',
    'component': () => import('@/views/ArticlesView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
