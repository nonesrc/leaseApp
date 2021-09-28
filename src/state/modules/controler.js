import { ref } from 'vue'
import { getClothingTypes_API } from '../../api'
import { axiosDataResolveHandle } from '../../utils/helper'

const entranceBarValues = ['home', 'sort', 'mine']
export default function () {
  // states
  // 入口底部激活
  const entranceBarActive = ref(0)
  // 全局搜索内容
  const searchText = ref('')
  // 租赁商品详细分类
  const rentClothingTypes = ref([])
  // 出售商品详细分类
  const sellClothingTypes = ref([])
  // mutations
  const reRntranceBarActive = val => {
    entranceBarActive.value = entranceBarValues.indexOf(val) || 0
  }
  const reSearchText = val => {
    searchText.value = val
  }
  const reRentClothingTypes = val => {
    rentClothingTypes.value = val
  }
  const reSellClothingTypes = val => {
    sellClothingTypes.value = val
  }
  const clearClothingTypes = () => {
    reRentClothingTypes([])
    reSellClothingTypes([])
  }
  // actions
  const getClothingTypes = async () => {
    const { data } = axiosDataResolveHandle(await getClothingTypes_API())
    reRentClothingTypes(data.rent)
    reSellClothingTypes(data.sell)
  }

  return {
    state: {
      entranceBarActive,
      searchText,
      rentClothingTypes,
      sellClothingTypes,
    },
    mutations: {
      reRntranceBarActive,
      reSearchText,
      reRentClothingTypes,
      reSellClothingTypes,
      clearClothingTypes,
    },
    actions: { getClothingTypes },
  }
}
