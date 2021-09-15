<template>
  <div class="lease-sort">
    <section class="selection-taps">
      <van-tabs
        v-model:active="active"
        type="card"
        title-inactive-color="#082032"
        color="#ff4c29"
      >
        <van-tab title="服装租赁"></van-tab>
        <van-tab title="服装购买"></van-tab>
      </van-tabs>
      <van-tabs v-model:active="active" color="#ff4c29">
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
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    return { list, loading, finished }
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.selection-taps {
  margin-bottom: $g-2;
}
</style>
