<template>
  <router-link
    class="lease-item-card"
    :to="{
      name: 'goods_details',
      query: { goods_id: goods.goods_id },
    }"
  >
    <div class="icon">
      <van-image
        width="140px"
        height="140px"
        radius="3px"
        fit="cover"
        :src="goods.main_img"
      />
    </div>
    <div class="item-info">
      <div class="describe">
        <div class="van-multi-ellipsis--l2">{{ goods.goods_name }}</div>
      </div>
      <div class="price">
        <Price
          :amount="
            goods.sale_type === 0 ? goods.rent_money : goods.market_price
          "
          :fontSise="12"
          :fontColor="'#ff4c29'"
          :unit="goods.unit"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue'
import Price from '../../public/price.vue'
import { Image as VanImage } from 'vant'

export default defineComponent({
  name: 'lease_item_card',
  components: {
    [VanImage.name]: VanImage,
    Price,
  },
  props: {
    goods: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';

.lease-item-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 160px;
  padding: 10px;
  border: 1px solid #d0d7de;
  border-radius: 3px;
  color: inherit;
  .item-info {
    .describe {
      min-height: $g-2;
      font-size: 13px;
      margin-bottom: math.div($g-1, 2.5);
    }
    .price {
      margin-top: auto;
      color: $color-g-3;
      font-size: 14px;
    }
  }
}
</style>
