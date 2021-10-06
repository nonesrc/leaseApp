import { ARFactory } from '../config'

const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'

export function getPickerShop_API(goods_id) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/shop/goods/order/pickerShop' : '',
    method: 'GET',
    data: {
      goods_id,
    },
  })
}
