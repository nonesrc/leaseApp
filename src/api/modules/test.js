// IMPORTANT:这个是测试用API !!!
import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

/**
 * 获取待付款订单详情
 * @param {string} order_id 订单id
 * @returns
 */
export function testGetPerPayOrderDetails_API(order_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/auth/oder/test/0' : '',
    method: 'GET',
    params: {
      order_id,
    },
  })
}
