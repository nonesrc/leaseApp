import { ref } from 'vue'
import { getGoodsSku_API } from '../api'
import { axiosDataResolveHandle } from '../utils/helper'

export default function (goods_id) {
  // sku是否准备完成
  const skuReady = ref(false)
  //   当前商品信息
  const currentGoodsInfo = ref({})
  // 当前商品sku
  const currentGoodsSku = ref({})
  // 用户选择配置
  const userRecords = ref({})
  //获取当前商品sku
  const getGoodsSku = async () => {
    const { success, data } = axiosDataResolveHandle(
      await getGoodsSku_API(goods_id)
    )
    if (success) {
      currentGoodsInfo.value = data.goods
      currentGoodsSku.value = data.skus
      console.log(currentGoodsSku.value)
      currentGoodsSku.value.forEach(function (sku) {
        if (sku.type === 'SKU_slider' || sku.type === 'SKU_selector') {
          userRecords.value[sku.key] = sku.records[0].id
          sku.slotTarget = 'label'
        }
        if (sku.type === 'SKU_counter') {
          userRecords.value[sku.key] = sku.records.min
          sku.slotTarget = 'value'
        }
      })
      skuReady.value = true
    }
  }

  return {
    skuReady,
    currentGoodsInfo,
    currentGoodsSku,
    userRecords,
    getGoodsSku,
  }
}
