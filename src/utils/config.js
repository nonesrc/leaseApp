export const BASE_API =
  import.meta.env.VITE_MODE === 'DEV'
    ? 'http://rap2api.taobao.org/app/mock/291472/'
    : ''

// 订单状态
export const ORDER_STATUS = {
  0: {
    tag: '待付款',
    bg: '#495057',
  },
  1: {
    tag: '备货中',
    bg: '#495057',
  },
  2: {
    tag: '待自提',
    bg: '#495057',
  },
  3: {
    tag: '配送中',
    bg: '#495057',
  },
  4: {
    tag: '待退还',
    bg: '#495057',
  },
  5: {
    tag: '待退押金',
    bg: '#495057',
  },
  6: {
    tag: '已完成',
    bg: '#495057',
  },
}
