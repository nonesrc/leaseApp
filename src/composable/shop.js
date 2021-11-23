import { ref } from 'vue'
import {
  shopRentGoodsPrice,
  shopSellGoodsPrice,
  shopGoodsDetails,
} from '../model'
import {
  getGoodsList_API,
  getGoodsDetails_API,
  getGoodsFilters_API,
} from '../api'
import { axiosDataResolveHandle } from '../utils/helper'
import router from '../routers'

export default function () {
  // 商品详细配置
  const goodsDetails = {
    ...shopGoodsDetails,
    ...shopRentGoodsPrice,
    ...shopSellGoodsPrice,
    _showPrice: 0,
  }

  // 商品详细分类
  const filters = ref([])
  // 当前商品列表
  const currentGoodsList = ref([])
  // 当前商品详情
  const currentGoodsDetails = ref({ ...goodsDetails })

  // 获取商铺详细分类
  const getGoodsFilters = async () => {
    const sort_type = router.currentRoute.value.params['sortType']
    if (!sort_type) return
    const { data, success } = axiosDataResolveHandle(
      await getGoodsFilters_API(
        JSON.parse(localStorage.getItem('selected_shop')).shop_id,
        sort_type
      )
    )
    if (success) {
      filters.value = [{ category_id: '', category_name: '全部' }, ...data]
    }
  }

  // 获取商品详细信息
  const getGoodsDetails = async goods_id => {
    const { success, data } = axiosDataResolveHandle(
      await getGoodsDetails_API(goods_id)
    )
    if (success) {
      currentGoodsDetails.value = Object.assign(
        {},
        currentGoodsDetails.value,
        data
      )
      currentGoodsDetails.value._showPrice = 0
    }
  }

  // 获取当前店铺的租赁或出售商品列表
  const getGoodsList = async (sort_type, filter, page, count) => {
    const { success, data } = axiosDataResolveHandle(
      await getGoodsList_API(sort_type, filter, page, count)
    )
    if (success) {
      currentGoodsList.value.push(...data)
      return data.length
    }
    return 0
  }

  // 清空商品列表
  const clearGoodsList = (clearFilters = false) => {
    currentGoodsList.value = []
    clearFilters && (filters.value = [])
  }

  return {
    filters,
    currentGoodsList,
    currentGoodsDetails,
    getGoodsFilters,
    getGoodsDetails,
    getGoodsList,
    clearGoodsList,
  }
}
