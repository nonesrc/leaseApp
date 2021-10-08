<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-check-order-list">
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
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { Card, Cell, ConfigProvider } from 'vant'
export default defineComponent({
  name: 'lease_check_order_list',
  components: {
    [Card.name]: Card,
    [Cell.name]: Cell,
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    // CSS
    const themeVars = {
      cellVerticalPadding: 0,
      cellHorizontalPadding: 0,
      cardBackgroundColor: '#fff',
    }
    return { themeVars }
  },
})
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';
// .lease-check-order-list {
// }
</style>
