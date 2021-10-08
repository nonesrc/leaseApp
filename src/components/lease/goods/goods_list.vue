<template>
  <div class="lease-goods-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-row
        align="left"
        v-for="index in Math.ceil(goodsList.length / 2)"
        :key="index"
      >
        <van-col span="12"
          ><ItemCard :goods="goodsList[index]" :sortType="sortType"
        /></van-col>
        <van-col span="12"
          ><ItemCard :goods="goodsList[index + 1]" :sortType="sortType"
        /></van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ItemCard from './item_card.vue'
import { Col, Row, List } from 'vant'
export default defineComponent({
  name: 'lease_goods_list',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    ItemCard,
  },
  props: {
    goodsList: {
      type: Array,
      required: false,
      default: [],
    },
    sortType: {
      type: String,
      required: false,
      default: 'rent',
    },
  },
  setup() {
    // 是否正在加载
    const loading = ref(false)
    // 是否完成
    const finished = ref(false)
    // 加载函数
    const onLoad = () => {
      //   console.log(123132)
    }
    return {
      loading,
      finished,
      onLoad,
    }
  },
})
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';

.lease-goods-list {
  .van-row:not(:last-child) {
    margin-bottom: $g-2;
  }
}
</style>
