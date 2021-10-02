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

/**
 * 获取租赁商品详细信息
 * @param {number} goods_id 商品id
 * @returns
 */
export function getRentGoodsDetails_API(goods_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/goods/rent' : '',
    method: 'GET',
    data: { goods_id },
  })
}

/**
 * 获取出售商品详细信息
 * @param {number} goods_id 商品id
 * @returns
 */
export function getSellGoodsDetails_API(goods_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/goods/sell' : '',
    method: 'GET',
    data: { goods_id },
  })
}

/**
 * 获取出售商品详细分类
 */
export function getClothingTypes_API() {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/clothingType' : '',
    method: 'GET',
  })
}
