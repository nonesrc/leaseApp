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
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { List, PullRefresh, Card } from 'vant'
export default defineComponent({
  name: 'lease_order_list',
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Card.name]: Card,
  },
  setup() {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1)
        }
        loading.value = false

        if (list.value.length >= 40) {
          finished.value = true
        }
      }, 1000)
    }

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad()
    }

    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
    }
  },
})
</script>

<style lang="scss">
// .lease-order-list {
// }
</style>
