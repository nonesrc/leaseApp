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
        <van-tabs
          v-model:active="clothingType"
          color="#082032"
          @click-tab="onChangeClothingType"
        >
          <van-tab title="推荐"></van-tab>
          <van-tab title="男装"></van-tab>
          <van-tab title="女装"></van-tab>
          <van-tab title="优惠"></van-tab>
        </van-tabs>
      </section>
    </van-sticky>
    <!-- <transition name="van-fade">
      <div v-show="true"><van-loading :vertical="true" /></div>
    </transition> -->
    <GoodsList
      :goodsList="
        sortType === 'rent' ? currentRentGoodsList : currentSellGoodsList
      "
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
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
      getGoodsList,
      clearGoodsList,
      currentRentGoodsList,
      currentSellGoodsList,
    } = useGoods()
    // 分类类型
    const sortType = ref('服装租赁')
    // 服装类型
    const clothingType = ref('推荐')
    // 改变商品类型
    const onChangeSortType = ({ name }) => {
      clearGoodsList()
      getGoodsList(null, null, null, name)
    }
    // 改变服饰类型
    const onChangeClothingType = ({ name }) => {
      console.log(name)
    }
    onMounted(async () => await getGoodsList())
    return {
      currentRentGoodsList,
      currentSellGoodsList,
      sortType,
      clothingType,
      onChangeSortType,
      onChangeClothingType,
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
