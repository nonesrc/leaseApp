<template>
  <div class="layout-main">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      v-show="router.currentRoute.value.meta.tag !== 'mine'"
    />
    <slot name="content"></slot>
    <van-tabbar
      v-model="entranceBarActive"
      active-color="#082032"
      inactive-color="#495057"
    >
      <van-tabbar-item
        :icon="
          router.currentRoute.value.meta.tag === 'home'
            ? 'wap-home'
            : 'wap-home-o'
        "
        :to="{ name: 'lease_home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        :icon="
          router.currentRoute.value.meta.tag === 'sort'
            ? 'shopping-cart'
            : 'shopping-cart-o'
        "
        :to="{ name: 'lease_sort' }"
        >选购</van-tabbar-item
      >
      <van-tabbar-item
        :icon="
          router.currentRoute.value.meta.tag === 'mine' ? 'manager' : 'user-o'
        "
        :to="{ name: 'lease_mine' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { Tabbar, TabbarItem, Search } from 'vant'
import { coreStateKey } from '../state'
import router from '../routers'
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
    return { entranceBarActive, searchText, router }
  },
})
</script>

<style lang="scss">
.layout-main {
  // min-height: 100vh;
  padding-bottom: 50px;
}
</style>
