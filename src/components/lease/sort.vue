<template>
  <div class="lease-sort">
    <section class="selection-taps">
      <van-tabs
        v-model:active="sortType"
        type="card"
        title-inactive-color="#082032"
        color="#082032"
      >
        <van-tab title="服装租赁"></van-tab>
        <van-tab title="服装购买"></van-tab>
      </van-tabs>
      <van-tabs v-model:active="clothingType" color="#082032">
        <van-tab title="推荐"></van-tab>
        <van-tab title="男装"></van-tab>
        <van-tab title="女装"></van-tab>
        <van-tab title="优惠"></van-tab>
      </van-tabs>
    </section>
    <section class="items-box">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-row align="center">
          <van-col span="12"><ItemCard /></van-col>
          <van-col span="12"><ItemCard /></van-col>
        </van-row>
      </van-list>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Tab, Tabs, Col, Row, List } from 'vant'
import ItemCard from '../public/item_card.vue'
export default defineComponent({
  name: 'lease_sort',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    ItemCard,
  },
  setup() {
    // 分类类型
    const sortType = ref('服装租赁')
    // 服装类型
    const clothingType = ref('推荐')
    // TEST
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const onLoad = () => {}
    return { sortType, clothingType, list, loading, finished, onLoad }
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.selection-taps {
  margin-bottom: $g-2;
}
</style>
