import { ref } from 'vue'

const entranceBarValues = ['home', 'sort', 'mine']
export default function () {
  // states
  // 全局搜索内容
  const searchText = ref('')
  // mutations
  const reSearchText = val => {
    searchText.value = val
  }
  // actions

  return {
    state: {
      searchText,
    },
    mutations: {
      reSearchText,
    },
    actions: {},
  }
}
