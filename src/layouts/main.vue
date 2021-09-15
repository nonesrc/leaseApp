<template>
  <div class="layout-main">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" />
    <slot name="content"></slot>
    <van-tabbar
      v-model="entranceBarActive"
      active-color="#ff4c29"
      inactive-color="#082032"
    >
      <van-tabbar-item icon="wap-home-o" :to="{ name: 'lease_home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="apps-o" :to="{ name: 'lease_sort' }"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" :to="{ name: 'lease_mine' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { Tabbar, TabbarItem, Search } from 'vant'
import { coreStateKey } from '../state'
export default defineComponent({
  name: 'layout-main',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Search.name]: Search,
  },
  setup() {
    const {
      controler: {
        state: { entranceBarActive, searchText },
      },
    } = inject(coreStateKey)
    return { entranceBarActive, searchText }
  },
})
</script>

<style lang="scss">
.layout-main {
  min-height: 100vh;
}
</style>
