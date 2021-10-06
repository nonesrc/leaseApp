<template>
  <div class="lease-order-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell :border="false">
        <template #value>
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          />
        </template>
      </van-cell>
      <van-cell :border="false">
        <template #value>
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          />
        </template>
      </van-cell>
      <van-cell :border="false">
        <template #value>
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { List, Card, Cell } from 'vant'
export default defineComponent({
  name: 'lease_order_list',
  components: {
    [List.name]: List,
    [Card.name]: Card,
    [Cell.name]: Cell,
  },
  setup() {
    // 加载数据
    const loading = ref(false)
    // 是否加载完成
    const finished = ref(true)
    return { loading, finished }
  },
})
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';
.lease-order-list {
}
</style>
