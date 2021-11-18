<template>
  <router-link
    class="lease-item-card"
    :to="{
      name: sortType === 'rent' ? 'rent_details' : 'sell_details',
      query: { goods_id: goods.goods_id },
    }"
  >
    <div class="icon">
      <van-image
        width="150px"
        height="150px"
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
          :amount="sortType === 'rent' ? goods.rent_money : goods.market_price"
          unit="天"
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
    sortType: {
      type: String,
      required: false,
      default: 'rent',
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
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 150px;
  background: $font-color-1;
  color: inherit;
  .item-info {
    padding: math.div($g-1, 2);
    padding-top: 0px;
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
