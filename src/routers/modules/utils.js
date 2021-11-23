import Utils from '../../views/utils.vue'
import Orders from '../../components/lease/mine/orders.vue'
import Cart from '../../components/lease/mine/cart.vue'
import Message from '../../components/lease/mine/message.vue'
import OrderDetails from '../../components/lease/order/order_details.vue'
import Pay from '../../components/lease/pay.vue'
import ErrorPage from '../../components/public/error_page.vue'

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
      path: 'mine/orders/details',
      name: 'orders_details',
      component: OrderDetails,
      meta: {
        tag: 'orders_details',
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
    {
      path: 'pay',
      name: 'pay',
      component: Pay,
      meta: {
        tag: 'pay',
      },
    },
    { path: '/:pathMatch(.*)*', name: 'error_page', component: ErrorPage },
  ],
}

export default [utils]
