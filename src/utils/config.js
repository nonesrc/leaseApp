export const BASE_API =
  import.meta.env.VITE_MODE === 'DEV'
    ? 'http://rap2api.taobao.org/app/mock/291472/'
    : ''

// 订单状态
export const ORDER_STATUS = {
  0: {
    tag: '待付款',
    bg: '#495057',
    tip: '等待付款',
    icon: 'balance-list-o',
  },
  1: {
    tag: '备货中',
    bg: '#495057',
    tip: '正在备货中 :P',
    icon: 'gift-card-o',
  },
  2: {
    tag: '待自提',
    bg: '#495057',
    tip: '等待自提',
    icon: 'bookmark-o',
  },
  3: {
    tag: '配送中',
    bg: '#495057',
    tip: '正在配送中，保持保持通话流畅 :P',
    icon: 'logistics',
  },
  4: {
    tag: '待退还',
    bg: '#495057',
    tip: '等待退还结算中',
    icon: 'exchange',
  },
  5: {
    tag: '待退押金',
    bg: '#495057',
    tip: '等待押金退还',
    icon: 'after-sale',
  },
  6: {
    tag: '已完成',
    bg: '#495057',
    tip: '订单已完成 :D',
    icon: 'completed',
  },
}
