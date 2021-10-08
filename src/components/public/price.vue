<template>
  <div
    class="lease-price"
    :style="`font-size:${fontSise}px;color:${fontColor};`"
  >
    <span class="flag" v-show="showFlag">¥</span
    ><span class="M-1">{{ beautifyMoney[0] }}</span
    >.<span class="M-2">{{ beautifyMoney[1] }}</span>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { resolveMoney } from '../../utils/helper'
export default defineComponent({
  name: 'lease_price',
  props: {
    amount: {
      type: Number,
      required: true,
    },
    showFlag: {
      type: Boolean,
      required: false,
      default: true,
    },
    fontSise: {
      type: Number,
      required: false,
      default: 14,
    },
    fontColor: {
      type: String,
      required: false,
      default: '#2c394b',
    },
  },
  setup(props) {
    const beautifyMoney = computed(() => {
      let monry = resolveMoney(props.amount)
      return new String(monry).split('.')
    })
    return { beautifyMoney }
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.lease-price {
  font-weight: 500;
  .flag,
  .M-2 {
    font-size: 0.8em;
  }
  .M-1 {
    font-size: 1.3em;
  }
}
</style>
