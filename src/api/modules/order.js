import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

/**
 * 获取用户订单
 * @param {string} keyworld 搜索关键字
 * @param {string} order_type 订单状态
 * @param {string} order_sort 订单分类
 * @param {number} page 当前页数
 * @param {number} count 每页包含条目
 * @returns
 */
export function getOrder_API(keyworld, order_type, order_sort, page, count) {
  return ARFactory({
    url: DEV_MODE ? '/api/auth/order' : '',
    method: 'GET',
    params: {
      keyworld,
      order_type,
      order_sort,
      page,
      count,
    },
  })
}
