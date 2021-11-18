import {
  ReportMoney,
  Loader,
  Download,
  TransferIn,
  RefreshAlert,
  CashBanknote,
  ClipboardCheck,
} from '@vicons/tabler'

export const BASE_API =
  import.meta.env.VITE_MODE === 'DEV'
    ? 'http://rap2api.taobao.org/app/mock/291472/'
    : ''

export const APP_ID = 'wx56e53ff5ed0b2046'
export const BASE_URL = 'http://192.168.43.134:3000/'

// 请求状态码
export const REQUEST_CODE = {
  2000: '操作成功！',
  3000: '操作失败！',
  4003: '身份验证失败！',
  4004: '操作权限不足',
  5000: '服务器发生未知错误！',
}
// 订单状态
export const ORDER_STATUS = {
  0: {
    tag: '待付款',
    bg: '#495057',
    tip: '等待付款',
    icon: ReportMoney,
  },
  1: {
    tag: '备货中',
    bg: '#495057',
    tip: '正在备货中 :P',
    icon: Loader,
  },
  2: {
    tag: '待自提',
    bg: '#495057',
    tip: '等待自提',
    icon: Download,
  },
  3: {
    tag: '配送中',
    bg: '#495057',
    tip: '正在配送中，保持保持通话流畅 :P',
    icon: TransferIn,
  },
  4: {
    tag: '待退还',
    bg: '#495057',
    tip: '等待退还结算中',
    icon: RefreshAlert,
  },
  5: {
    tag: '待退押金',
    bg: '#495057',
    tip: '等待押金退还',
    icon: CashBanknote,
  },
  6: {
    tag: '已完成',
    bg: '#495057',
    tip: '订单已完成 :D',
    icon: ClipboardCheck,
  },
}
