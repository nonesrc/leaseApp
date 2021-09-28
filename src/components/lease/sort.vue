<template>
  <div class="lease-sort">
    <van-sticky>
      <section class="selection-taps">
        <van-tabs
          v-model:active="sortType"
          type="card"
          title-inactive-color="#082032"
          color="#082032"
          @click-tab="onChangeSortType"
        >
          <van-tab title="服装租赁" name="rent"></van-tab>
          <van-tab title="服装购买" name="sell"></van-tab>
        </van-tabs>
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
import { Tab, Tabs, Sticky, Loading } from 'vant'
import GoodsList from '../public/goods_list.vue'
import useGoods from '../../composable/goods'
export default defineComponent({
  name: 'lease_sort',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    GoodsList,
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
    const onChangeSortType = ({ name }) => {
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
