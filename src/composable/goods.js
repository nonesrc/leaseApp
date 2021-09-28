import { ref } from 'vue'
import {
  shopRentGoodsPrice,
  shopGoodsOverview,
  shopSellGoodsPrice,
} from '../model'
import { getRentGoodsList_API, getSellGoodsList_API } from '../api'
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
  const getGoodsList = async (sort, page, count, type = 'rent') => {
    const { code, success, msg, data } = axiosDataResolveHandle(
      type === 'rent'
        ? await getRentGoodsList_API(sort, page, count)
        : await getSellGoodsList_API(sort, page, count)
    )
    type === 'rent'
      ? currentRentGoodsList.value.push(...data)
      : currentSellGoodsList.value.push(...data)
  }

  // 清空商品列表
  const clearGoodsList = type => {
    ;(type === 'rent' && (currentRentGoodsList.value = [])) ||
      (type === 'sell' && (currentSellGoodsList.value = []))
    if (!type) {
      currentRentGoodsList.value = []
      currentSellGoodsList.value = []
    }
  }

  return {
    currentRentGoodsList,
    currentSellGoodsList,
    getGoodsList,
    clearGoodsList,
  }
}
