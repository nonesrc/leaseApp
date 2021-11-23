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
      path: 'goods_details',
      name: 'goods_details',
      component: Goods,
      meta: {
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
