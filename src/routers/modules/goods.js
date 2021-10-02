import Utils from '../../views/utils.vue'
import Goods from '../../components/lease/goods.vue'

// 登录页
const goods = {
  path: '/goods',
  component: Utils,
  redirect: '/',
  meta: {
    tag: 'goods',
  },
  children: [
    {
      path: 'rent',
      name: 'rent_details',
      component: Goods,
      meta: {
        tag: 'rent',
      },
    },
    {
      path: 'sell',
      name: 'sell_details',
      component: Goods,
      meta: {
        tag: 'sell',
      },
    },
  ],
}

export default [goods]
