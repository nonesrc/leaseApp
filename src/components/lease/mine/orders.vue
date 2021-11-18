<template>
  <div class="lease-orders">
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="searchValue_ = searchValue"
      @blur="searchValue_ = searchValue"
    >
      <template #left>
        <van-popover
          v-model:show="showFilter"
          placement="right-start"
          :actions="filterActions"
          @select="onFilterSelect"
        >
          <template #reference>
            <van-button size="small" color="#2c394b" style="margin-right: 10px">
              <div class="flexc">
                <Icon size="18"><Filter /></Icon> {{ filterValue }}
              </div>
            </van-button>
          </template>
        </van-popover>
      </template>
    </van-search>
    <van-tabs
      v-model:active="activeTab"
      title-inactive-color="#082032"
      color="#082032"
    >
      <van-tab title="待付款"> </van-tab>
      <van-tab title="备货中"> </van-tab>
      <van-tab title="待自提"> </van-tab>
      <van-tab title="配送中"> </van-tab>
      <van-tab title="待退还"> </van-tab>
      <van-tab title="待退押金"> </van-tab>
      <van-tab title="已完成"> </van-tab>
    </van-tabs>

    <div class="order-content">
      <OrderList
        :keyword="searchValue_"
        :orderStatus="activeTab"
        :sortType="
          ['all', 'rent', 'sell'][
            filterActions.map(t => t.text).indexOf(filterValue)
          ]
        "
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import OrderList from '../order/order_list.vue'
import { Filter } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Tab, Tabs, Search, Popover, Button } from 'vant'

export default defineComponent({
  name: 'lease_orders',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [Popover.name]: Popover,
    [Button.name]: Button,
    OrderList,
    Icon,
    Filter,
  },
  setup() {
    // 搜索内容
    const searchValue = ref('')
    const searchValue_ = ref('')
    // 过滤
    const showFilter = ref(false)
    const filterActions = [
      { text: '全部商品' },
      { text: '租赁商品' },
      { text: '出售商品' },
    ]
    const filterValue = ref(filterActions[0].text)
    const onFilterSelect = action => (filterValue.value = action.text)
    // 当前活跃Tabs
    const activeTab = ref(0)
    return {
      activeTab,
      searchValue,
      searchValue_,
      showFilter,
      filterActions,
      filterValue,
      onFilterSelect,
    }
  },
})
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';
.lease-orders {
  min-height: 100vh;
  .order-content {
    padding-top: $g-1;
  }
}
</style>
