import Utils from '../../views/utils.vue'
import Goods from '../../components/lease/goods.vue'
import CheckOrder from '../../components/lease/order/check_order.vue'

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
        title: '商品详情',
      },
    },
    {
      path: 'sell',
      name: 'sell_details',
      component: Goods,
      meta: {
        tag: 'sell',
        title: '商品详情',
      },
    },
    {
      path: 'check_order',
      name: 'check_order',
      component: CheckOrder,
      meta: {
        tag: 'check_order',
        title: '生成订单',
      },
    },
  ],
}

export default [goods]
