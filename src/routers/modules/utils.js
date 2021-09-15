import Utils from '../../views/utils.vue'
import Orders from '../../components/lease/mine/orders.vue'
import Cart from '../../components/lease/mine/cart.vue'
import Message from '../../components/lease/mine/message.vue'

// 登录页
const utils = {
  path: '/utils',
  component: Utils,
  meta: {
    tag: 'utils',
  },
  children: [
    {
      path: 'mine',
      redirect: '/mine',
    },
    {
      path: 'mine/orders',
      name: 'orders',
      component: Orders,
      meta: {
        tag: 'orders',
      },
    },
    {
      path: 'mine/cart',
      name: 'cart',
      component: Cart,
      meta: {
        tag: 'cart',
      },
    },
    {
      path: 'mine/message',
      name: 'message',
      component: Message,
      meta: {
        tag: 'message',
      },
    },
  ],
}

export default [utils]
