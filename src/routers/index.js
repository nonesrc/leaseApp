import { createRouter, createWebHistory } from 'vue-router'
import coreRouters from './modules/core'
import utilsRouters from './modules/utils'
import goodsRouters from './modules/goods'
import authRouters from './modules/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRouters, ...utilsRouters, ...goodsRouters, ...authRouters],
})

export default router
