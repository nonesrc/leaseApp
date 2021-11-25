<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-check-order-list">
      <van-cell :border="false">
        <template #value>
          <van-card
            :num="userRecords.count"
            :desc="skuString"
            :title="goodsInfo.goods_name"
            :thumb="goodsInfo.main_img"
          >
            <template #price><Price :amount="goodsInfo.deposit" /></template>
          </van-card>
        </template>
      </van-cell>
      <div class="suit-content" v-if="false">
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
import Price from '../../public/price.vue'
import { Card, Cell, Image as VanImage, ConfigProvider } from 'vant'
export default defineComponent({
  name: 'lease_check_order_list',
  components: {
    [Card.name]: Card,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [ConfigProvider.name]: ConfigProvider,
    Price,
  },
  props: {
    goodsInfo: {
      type: Object,
      required: false,
      default: {},
    },
    userRecords: {
      type: Object,
      required: false,
      default: {},
    },
    skuString: {
      type: String,
      required: false,
      default: '',
    },
    isRentGoods: {
      type: Boolean,
      required: false,
      default: 0,
    },
  },
  setup(props) {
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
          color: $color-g-3;
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
