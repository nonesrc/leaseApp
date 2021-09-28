import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

/**
 * 获取租赁商品列表
 * @param {number} sort
 * @param {number} page
 * @param {number} count
 * @returns
 */
export function getRentGoodsList_API(sort, page, count) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/list/rent' : '',
    method: 'GET',
    data: { sort, page, count },
  })
}

/**
 * 获取出售商品列表
 * @param {number} sort
 * @param {number} page
 * @param {number} count
 * @returns
 */
export function getSellGoodsList_API(sort, page, count) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/list/sell' : '',
    method: 'GET',
    data: { sort, page, count },
  })
}
