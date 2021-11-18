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
  // mutations
  const reRntranceBarActive = val => {
    entranceBarActive.value = entranceBarValues.indexOf(val) || 0
  }
  const reSearchText = val => {
    searchText.value = val
  }
  // actions

  return {
    state: {
      entranceBarActive,
      searchText,
    },
    mutations: {
      reRntranceBarActive,
      reSearchText,
    },
    actions: {},
  }
}
