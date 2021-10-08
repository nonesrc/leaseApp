<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-check-order-list">
      <!-- 套装示例 -->
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
      <div class="suit-content">
        <div class="banner">套装包含：</div>
        <van-cell :border="false">
          <template #value>
            <div class="detsils-order-box">
              <van-image
                width="60"
                height="60"
                fit="cover"
                src="https://img.yzcdn.cn/vant/ipad.jpeg"
              />
              <div class="sku-info">
                <span>上衣 深蓝色 XL码</span>
                <span>X1</span>
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { Card, Cell, Image as VanImage, ConfigProvider } from 'vant'
export default defineComponent({
  name: 'lease_check_order_list',
  components: {
    [Card.name]: Card,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
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
.lease-check-order-list {
  .suit-content {
    padding: var(--van-card-padding);
    background: #fff;
    font-size: 14px;
    color: $font-color-6;
    .banner {
      margin-bottom: $g-1;
    }
    .detsils-order-box {
      display: flex;
      .sku-info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex-grow: 1;
        span {
          color: $color-g-2;
          display: block;
          font-size: 14px;
          &:nth-child(2) {
            font-size: 11.5px;
            color: $font-color-6;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
