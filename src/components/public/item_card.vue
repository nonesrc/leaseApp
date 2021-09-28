<template>
  <div class="lease-item-card">
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
        <span>¥</span>{{ goods.rent_money || goods.market_price }}/天
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Image as VanImage } from 'vant'
export default defineComponent({
  name: 'lease_item_card',
  components: {
    [VanImage.name]: VanImage,
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
@import '../../assets/styles/index.scss';

.lease-item-card {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 150px;
  background: $font-color-1;
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
      font-size: 13px;
    }
  }
}
</style>
