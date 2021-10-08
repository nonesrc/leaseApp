import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

/**
 * 获取商品自取点
 * @param {string} goods_id 商品id
 * @returns
 */
export function getPickerShop_API(goods_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/goods/order/pickerShop' : '',
    method: 'GET',
    data: {
      goods_id,
    },
  })
}
