import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { checkShopValid } from '../utils/helper'
import { coreState } from '../state'
import coreRouters from './modules/core'
import utilsRouters from './modules/utils'
import goodsRouters from './modules/goods'
import authRouters from './modules/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRouters, ...utilsRouters, ...goodsRouters, ...authRouters],
})

router.beforeEach((to, from, next) => {
  const {
    user: {
      state: { userSelectedShop },
      mutations: { reUserSelectdedShop },
    },
    controler: {
      mutations: { reShowSelectShop },
    },
  } = coreState
  const userSelectedShopInfo = JSON.parse(
    localStorage.getItem('selected_shop') || '{}'
  )
  if (!checkShopValid(userSelectedShopInfo)) {
    reShowSelectShop(true)
    watch(userSelectedShop, n => {
      if (!checkShopValid(n)) {
        return
      }
      reUserSelectdedShop(n)
      next()
    })
  } else {
    if (!checkShopValid(userSelectedShop.value)) {
      reUserSelectdedShop(userSelectedShopInfo)
    }
    next()
  }
})

export default router
