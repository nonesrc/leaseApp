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
            v-model:active="secondTypes"
            color="#082032"
            @click-tab="onChangeSecondTypes"
            v-show="secondTypes.length"
          >
            <van-tab
              :title="type.category_name"
              :name="type.category_id"
              v-for="(type, index) in rentClothingTypes"
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
            :sortType="sortType"
            v-for="(goods, index) in goodsList"
            :key="index"
          />
        </div>
      </van-list>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
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
      rentClothingTypes,
      sellClothingTypes,
      getClothingTypes,
      getGoodsList,
      clearGoodsList,
      currentRentGoodsList,
      currentSellGoodsList,
    } = useShop()
    // 当前商品加载页数
    const currnetPageIndex = ref(1)
    // 分类类型
    const sortType = ref('rent')
    // 详细类型（动态）
    const secondTypes = ref('')
    // 商品代指
    const goodsList = computed(() => {
      return sortType.value === 'rent'
        ? currentRentGoodsList.value
        : currentSellGoodsList.value
    })
    // 改变商品类型
    const onChangeSortType = async name => {
      clearGoodsList()
      currnetPageIndex.value = 1
      await getGoodsList('', currnetPageIndex.value, 10, sortType.value)
      sortType.value = name
    }
    // 改变服饰类型
    const onChangeSecondTypes = async ({ name }) => {
      clearGoodsList()
      currnetPageIndex.value = 1
      secondTypes.value = name
      await getGoodsList(name, currnetPageIndex.value, 10, sortType.value)
      console.log(goodsList.value)
    }

    // 开始获取商品
    !(async () => {
      clearGoodsList()
      await getGoodsList(
        secondTypes.value,
        currnetPageIndex.value,
        10,
        sortType.value
      )
      if (!rentClothingTypes.value.length || !sellClothingTypes.value.length) {
        await getClothingTypes()
      }
      secondTypes.value = rentClothingTypes.value[0].category_id
    })()
    // 是否正在加载
    const loading = ref(false)
    // 是否完成
    const finished = ref(false)
    // 加载函数
    const onLoad = async () => {
      currnetPageIndex.value++
      const resultLength = await getGoodsList(
        secondTypes.value,
        currnetPageIndex.value,
        10,
        sortType.value
      )
      if (resultLength < 10) {
        finished.value = true
      }
    }
    return {
      currentRentGoodsList,
      currentSellGoodsList,
      sortType,
      secondTypes,
      rentClothingTypes,
      onChangeSortType,
      onChangeSecondTypes,
      loading,
      finished,
      onLoad,
      goodsList,
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
  }
}
</style>
