<template>
  <div class="lease-sort">
    <van-sticky>
      <section class="selection-taps">
        <van-grid :clickable="true" :border="false">
          <van-grid-item text="租赁" @click="onChangeSortType('rent')">
            <template #icon
              ><Icon size="30"> <Shirt /></Icon> </template
          ></van-grid-item>
          <van-grid-item text="定制" @click="onChangeSortType('sell')">
            <template #icon
              ><Icon size="30"> <Ruler2 /></Icon> </template
          ></van-grid-item>
          <van-grid-item text="清洗" @click="Toast('敬请期待')">
            <template #icon
              ><Icon size="30"> <ChartBubble /></Icon>
            </template>
          </van-grid-item>
          <van-grid-item text="摄影" @click="Toast('敬请期待')">
            <template #icon
              ><Icon size="30"> <Camera /></Icon>
            </template>
          </van-grid-item>
        </van-grid>
        <transition name="van-fade">
          <div class="clothing-type-tab" style="height: 44px">
            <van-tabs
              v-model:active="clothingTypes"
              color="#082032"
              @click-tab="onChangeClothingTypes"
              v-show="clothingTypes.length"
            >
              <van-tab
                :title="type.category_name"
                :name="type.category_id"
                v-for="(type, index) in rentClothingTypes"
                :key="index"
              ></van-tab>
            </van-tabs>
          </div>
        </transition>
      </section>
    </van-sticky>
    <GoodsList
      :goodsList="
        sortType === 'rent' ? currentRentGoodsList : currentSellGoodsList
      "
      :sortType="sortType"
    />
  </div>
</template>

<script>
import { defineComponent, ref, inject } from 'vue'
import { coreStateKey } from '../../state'
import GoodsList from './goods/goods_list.vue'
import useGoods from '../../composable/goods'
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
    [ConfigProvider.name]: ConfigProvider,
    GoodsList,
    Icon,
    Shirt,
    ChartBubble,
    Camera,
    Ruler2,
  },
  setup() {
    const {
      controler: {
        state: { rentClothingTypes, sellClothingTypes },
        actions: { getClothingTypes },
      },
    } = inject(coreStateKey)
    const {
      getGoodsList,
      clearGoodsList,
      currentRentGoodsList,
      currentSellGoodsList,
    } = useGoods()
    // 分类类型
    const sortType = ref('rent')
    // 租赁服装类型 & 出售服装类型
    const clothingTypes = ref('')
    // 改变商品类型
    const onChangeSortType = name => {
      clearGoodsList()
      getGoodsList(null, null, null, name)
      clothingTypes.value =
        name === 'rent'
          ? rentClothingTypes.value[0].category_id
          : sellClothingTypes.value[0].category_id
    }
    // 改变服饰类型
    const onChangeClothingTypes = ({ name }) => {
      clothingTypes.value = name
    }
    !(async () => {
      await getGoodsList()
      if (!rentClothingTypes.value.length || !sellClothingTypes.value.length) {
        await getClothingTypes()
      }
      clothingTypes.value = rentClothingTypes.value[0].category_id
    })()

    return {
      currentRentGoodsList,
      currentSellGoodsList,
      sortType,
      clothingTypes,
      rentClothingTypes,
      onChangeSortType,
      onChangeClothingTypes,
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
}
</style>
