<template>
  <div class="lease-sort">
    <section class="selection-taps">
      <van-grid :clickable="true" :border="false">
        <van-grid-item text="租赁" @click="onChangeSortType('rent')">
          <template #icon
            ><Icon size="30" :color="sortType === 'rent' ? '#ff4c29' : ''">
              <Shirt /></Icon></template
        ></van-grid-item>
        <van-grid-item text="清洗" @click="onChangeSortType('wash')">
          <template #icon
            ><Icon size="30" :color="sortType === 'wash' ? '#ff4c29' : ''"
              ><ChartBubble
            /></Icon>
          </template>
        </van-grid-item>
        <van-grid-item text="定制" @click="Toast('敬请期待')">
          <template #icon
            ><Icon size="30"> <Ruler2 /></Icon></template
        ></van-grid-item>
        <van-grid-item text="摄影" @click="Toast('敬请期待')">
          <template #icon
            ><Icon size="30"><Camera /></Icon>
          </template>
        </van-grid-item>
      </van-grid>
      <van-sticky>
        <div class="clothing-type-tab" style="height: 44px">
          <van-tabs
            v-model:active="filter"
            color="#ff4c29"
            @click-tab="onChangeFilter"
            v-show="filters.length"
          >
            <van-tab
              :title="type.category_name"
              :name="type.category_id"
              v-for="(type, index) in filters"
              :key="index"
            ></van-tab>
          </van-tabs>
        </div>
      </van-sticky>
    </section>
    <section class="goods-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goods-container">
          <ItemCard
            :goods="goods"
            v-for="(goods, index) in currentGoodsList"
            :key="index"
          />
        </div>
      </van-list>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'
import useShop from '../../composable/shop'
import ItemCard from '../lease/goods/item_card.vue'
import { Shirt, Ruler2, ChartBubble, Camera } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import {
  Tab,
  Tabs,
  Sticky,
  Loading,
  Grid,
  GridItem,
  Toast,
  List,
  ConfigProvider,
} from 'vant'
import router from '../../routers'

export default defineComponent({
  name: 'lease_sort',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [List.name]: List,
    [ConfigProvider.name]: ConfigProvider,
    Icon,
    Shirt,
    ChartBubble,
    Camera,
    Ruler2,
    ItemCard,
  },
  setup() {
    const {
      filters,
      currentGoodsList,
      getGoodsFilters,
      getGoodsList,
      clearGoodsList,
    } = useShop()
    // 当前商品加载页数
    const currnetPageIndex = ref(1)
    // 分类类型
    const sortType = computed(() => {
      return router.currentRoute.value.params['sortType'] || 'rent'
    })
    // 二级分类
    const filter = ref('')
    // 切换分类类型
    const onChangeSortType = async name => {
      if (sortType.value === name) return
      router.push({ name: 'lease_sort', params: { sortType: name } })
      clearGoodsList(true)
      currnetPageIndex.value = 1
      await getGoodsFilters(name)
      await getGoodsList(name, '', currnetPageIndex.value, 10)
    }
    // 改变服饰类型
    const onChangeFilter = async ({ name }) => {
      clearGoodsList()
      currnetPageIndex.value = 1
      filter.value = name
      await getGoodsList(sortType.value, name, currnetPageIndex.value, 10)
    }
    // 是否正在加载
    const loading = ref(false)
    // 是否完成
    const finished = ref(false)
    // 加载函数
    const onLoad = async () => {
      if (!filters.value.length) await getGoodsFilters(sortType.value)
      const resultLength = await getGoodsList(
        sortType.value,
        filter.value,
        currnetPageIndex.value++,
        10
      )
      if (resultLength < 10) {
        finished.value = true
      }
    }
    return {
      filters,
      currentGoodsList,
      sortType,
      filter,
      onChangeSortType,
      onChangeFilter,
      loading,
      finished,
      onLoad,
      Toast,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../assets/styles/index.scss';
.lease-sort {
  .selection-taps {
    padding-top: $g-1;
    margin-bottom: $g-2;
    background: white;
    & > *:first-child {
      margin-bottom: math.div($g-1, 2);
    }
  }
  .goods-list .goods-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }
}
</style>
