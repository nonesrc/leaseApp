import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

/**
 * 获取商品自取点
 * @param {string} goods_id 商品id
 * @returns
 */
export function getPickerShop_API(shop_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/goods/order/pickerShop' : '',
    method: 'GET',
    params: {
      shop_id,
    },
  })
}

/**
 * 获取全部自提点
 * @returns
 */
export function getShopList_API() {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/list' : '',
    method: 'GET',
  })
}

/**
 * 获取租赁商品列表
 * @param {string} sort_type
 * @param {string} filter
 * @param {number} page
 * @param {number} count
 * @returns
 */
export function getGoodsList_API(sort_type, filter, page, count) {
  return ARFactory({
    url: DEV_MODE ? 'http://rap2api.taobao.org/app/mock/291472/api/public/shop/goods_list' : '',
    method: 'GET',
    params: {
      shop_id: JSON.parse(localStorage.getItem('selected_shop')).shop_id,
      sort_type,
      filter,
      page,
      count,
    },
  })
}

/**
 * 获取商品详细信息
 * @param {string} goods_id 商品id
 * @returns
 */
export function getGoodsDetails_API(goods_id) {
  return ARFactory({
    url: DEV_MODE
      ? 'http://rap2api.taobao.org/app/mock/291472/api/public/shop/goods/details'
      : '',
    method: 'GET',
    params: { goods_id },
  })
}

/**
 * 获取商铺详细分类
 * @param {string} sort_type 分类类型
 * @returns
 */
export function getGoodsFilters_API(sort_type) {
  return ARFactory({
    url: DEV_MODE
      ? 'http://rap2api.taobao.org/app/mock/291472/api/public/shop/filters'
      : '',
    method: 'GET',
    params: {
      shop_id: JSON.parse(localStorage.getItem('selected_shop')).shop_id,
      sort_type,
    },
  })
}

/**
 * 获取商品sku
 * @param {string} goods_id 商品id
 * @returns
 */
export function getGoodsSku_API(goods_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/sku' : '',
    method: 'GET',
    params: {
      goods_id,
    },
  })
}
