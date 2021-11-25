import { ref } from 'vue'

export default function () {
  // states
  // 是否展示选择门店
  const showSelectShop = ref(false)
  // 全局搜索内容
  const searchText = ref('')
  // mutations
  const reSearchText = val => {
    searchText.value = val
  }
  const reShowSelectShop = val => {
    showSelectShop.value = val
  }
  // actions

  return {
    state: {
      showSelectShop,
      searchText,
    },
    mutations: {
      reShowSelectShop,
      reSearchText,
    },
    actions: {},
  }
}
