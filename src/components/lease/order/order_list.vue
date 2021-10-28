<template>
  <div class="lease-order-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="order in currentOrderList"
          :key="order.order_id"
          :desc="order.sku_string"
          :title="order.goods_name"
          :thumb="order.main_img"
          @click="
            router.push({
              name: 'orders_details',
              query: { order_id: order.order_id },
            })
          "
        >
          <template #bottom>
            <div class="buttom">
              <div class="price">
                <Price :amount="order.order_price" /><span
                  :class="{ 'has-mr': [0, 4].includes(order.order_status) }"
                  >x{{ order.count }}</span
                >
              </div>
              <div class="operation">
                <van-button
                  v-if="order.order_status === 0"
                  color="#2c394b"
                  size="mini"
                  >支付</van-button
                >
                <van-button
                  v-if="order.order_status === 4"
                  color="#2c394b"
                  size="mini"
                  >续租</van-button
                >
              </div>
            </div>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { defineComponent, ref, watch, unref } from 'vue'
import { getOrder_API } from '../../../api'
import { axiosDataResolveHandle } from '../../../utils/helper'
import Price from '../../public/price.vue'
import router from '../../../routers'
import { List, PullRefresh, Card, Button } from 'vant'
export default defineComponent({
  name: 'lease_order_list',
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Card.name]: Card,
    [Button.name]: Button,
    Price,
  },
  props: {
    sortType: {
      type: String,
      required: false,
      default: 'all',
    },
    orderType: {
      type: Number,
      required: false,
      default: 0,
    },
    keyword: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    // 当前商品列表
    const currentOrderList = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const page = ref(1)
    // 重新加载数据
    const onLoad = async () => {
      if (refreshing.value) {
        page.value = 1
        currentOrderList.value = []
        refreshing.value = false
      }
      const { success, data } = axiosDataResolveHandle(
        await getOrder_API(
          props.keyword,
          props.orderType,
          props.sortType,
          unref(page),
          5
        )
      )
      page.value++
      if (success) {
        currentOrderList.value.push(...data)
      }
      loading.value = false
      if (!success || data.length < 5) {
        finished.value = true
      }
    }

    const onRefresh = () => {
      finished.value = false
      loading.value = true
      onLoad()
    }
    watch(
      () => [props.sortType, props.orderType, props.keyword],
      () => {
        refreshing.value = true
        onLoad()
      }
    )
    return {
      currentOrderList,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      router,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';
.lease-order-list {
  .van-list {
    min-height: calc(100vh - 144px);
    .buttom {
      display: flex;
      align-items: center;
      .price {
        display: flex;
        align-items: center;
        flex-grow: 1;
        & > span {
          display: inline-block;
          margin-left: auto;
          &.has-mr {
            margin-right: $g-1;
          }
        }
      }
      .operation {
        display: flex;
        justify-content: flex-end;
        .van-button {
          min-width: 50px;
        }
      }
    }
  }
}
</style>
