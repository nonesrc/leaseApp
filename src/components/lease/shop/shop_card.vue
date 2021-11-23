<template>
  <section class="lease-shop-card">
    <van-image
      src="https://dummyimage.com/80x80/2c394b/ffffff.png&text=Dream"
      height="80"
      width="80"
      fit="cover"
      radius="8"
    >
      <template v-slot:loading>
        <van-loading size="20" :vertical="true" />
      </template>
    </van-image>
    <div class="shop-status">
      <div class="van-ellipsis">{{ pickerShopInfo.shop_name }}</div>
      <div>
        <van-tag :color="pickerShopInfo.in_business ? '#27ae60' : '#2c394b'">{{
          pickerShopInfo.in_business ? '营业中' : '已休业'
        }}</van-tag>
      </div>
      <div>
        <Icon><Phone /></Icon>
        {{ pickerShopInfo.shop_contact }} ({{ pickerShopInfo.shop_owner }})
      </div>
    </div>
  </section>
  <van-field
    v-model="pickerShopInfo.shop_address"
    rows="1"
    type="textarea"
    autosize
    disabled
  />
</template>

<script>
import { defineComponent } from 'vue'
import { Phone } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Image as VanImage, Loading, Tag, Field } from 'vant'

export default defineComponent({
  name: 'lease_shop_card',
  components: {
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [Tag.name]: Tag,
    [Field.name]: Field,
    Icon,
    Phone,
  },
  props: {
    pickerShopInfo: {
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
.lease-shop-card {
  display: flex;
  .shop-status {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: $g-1;
    flex-grow: 1;
    color: $font-color-7;
    div:nth-child(1) {
      font-size: 15px;
      font-weight: bold;
    }
    div:nth-child(3) {
      margin-top: $g-1;
      font-size: 13px;
      color: $font-color-6;
    }
  }
}
</style>
