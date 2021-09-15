import { createRouter, createWebHistory } from 'vue-router'
import coreRouters from './modules/core'
import utilsRouters from './modules/utils'

const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRouters,...utilsRouters],
})

export default router
