import { ref } from 'vue'
import {
  shopRentGoodsPrice,
  shopGoodsOverview,
  shopSellGoodsPrice,
} from '../model'
import { getRentGoodsList_API } from '../api'
import { axiosDataResolveHandle } from '../utils/helper'

export default function () {
  // 租赁商品基本配置
  const rentGoodsListConfig = { ...shopGoodsOverview, ...shopRentGoodsPrice }

  // 出售商品配置
  const sellGoodslistConfig = { ...shopGoodsOverview, ...shopSellGoodsPrice }
  // 当前租赁商品列表
  const currentRentGoodsList = ref([])

  // 当前出售商品列表
  const currentSellGoodsList = ref([])

  // 获取当前店铺的租赁商品列表
  const getRentGoodsList = async (sort, page, count) => {
    const { code, success, msg, data } = axiosDataResolveHandle(
      await getRentGoodsList_API(sort, page, count)
    )
    console.log(data)
  }

  return {
    currentRentGoodsList,
    currentSellGoodsList,
    getRentGoodsList,
  }
}
