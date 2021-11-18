<template>
  <div class="layout-main">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      v-show="currentPageTag !== 'mine'"
    />
    <slot name="content"></slot>
    <van-tabbar
      v-model="entranceBarActive"
      active-color="#082032"
      inactive-color="#495057"
    >
      <van-tabbar-item :to="{ name: 'lease_home' }"
        >首页
        <template #icon
          ><Icon :color="currentPageTag === 'home' ? '#ff4c29' : '#2c394b'"
            ><SmartHome /></Icon
        ></template>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'lease_sort' }"
        >选购
        <template #icon
          ><Icon :color="currentPageTag === 'sort' ? '#ff4c29' : '#2c394b'"
            ><ShoppingCart /></Icon
        ></template>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'lease_mine' }"
        >我的
        <template #icon
          ><Icon :color="currentPageTag === 'mine' ? '#ff4c29' : '#2c394b'"
            ><User /></Icon
        ></template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import { coreStateKey } from '../state'
import router from '../routers'
import { SmartHome, ShoppingCart, User } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Tabbar, TabbarItem, Search } from 'vant'

export default defineComponent({
  name: 'layout-main',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Search.name]: Search,
    Icon,
    ShoppingCart,
    User,
    SmartHome,
  },
  setup() {
    const {
      controler: {
        state: { entranceBarActive, searchText },
      },
    } = inject(coreStateKey)
    // 当前页面tag
    const currentPageTag = computed(
      () => router.currentRoute.value.meta.tag || 'home'
    )
    return { entranceBarActive, searchText, currentPageTag }
  },
})
</script>

<style lang="scss">
.layout-main {
  // min-height: 100vh;
  padding-bottom: 50px;
}
</style>
