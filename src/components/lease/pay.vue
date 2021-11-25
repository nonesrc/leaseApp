<template>
  <div class="lease-pay">
    <div class="banner flexc">
      <Price :amount="1232" :fontSise="25" :fontColor="'#fff'" />
    </div>
    <van-radio-group v-model="payWay">
      <van-cell-group>
        <van-cell title="微信支付" clickable @click="payWay = 'weChat'">
          <template #right-icon>
            <van-radio name="weChat" checked-color="#2c394b" />
          </template>
        </van-cell>
        <van-cell title="支付宝" clickable @click="payWay = 'Ali'">
          <template #right-icon>
            <van-radio name="Ali" checked-color="#2c394b" :disabled="true" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="btn">
      <van-button block round color="#2c394b" @click="onPay">支付</van-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Price from '../public/price.vue'
import { RadioGroup, Radio, Cell, CellGroup, Button } from 'vant'
export default defineComponent({
  name: 'lease_pay',
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    Price,
  },
  setup() {
    //  用户选择支付方式
    const payWay = ref('weChat')
    // 开始支付
    const onPay = () => {}
    return { payWay, onPay }
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.lease-pay {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 46px);
  .banner {
    height: 200px;
    background: $color-g-3;
    clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
    margin-bottom: 100px;
  }
  .btn {
    margin-top: auto;
    margin-bottom: $g-1;
    padding: 0 $g-2;
  }
}
</style>
