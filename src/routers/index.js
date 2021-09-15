import { createRouter, createWebHistory } from 'vue-router'
import coreRouters from './modules/core'

const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRouters],
})

export default router
