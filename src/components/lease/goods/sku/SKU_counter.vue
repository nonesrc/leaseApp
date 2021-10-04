<template>
  <div class="lease-sku-counter">
    <van-stepper
      v-model="currentSelect"
      :min="recordList.min === -1 ? 1 : recordList.min"
      :max="recordList.max === -1 ? Infinity : recordList.max"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { Stepper } from 'vant'
export default defineComponent({
  name: 'lease_sku_counter',
  components: {
    [Stepper.name]: Stepper,
  },
  props: {
    recordList: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    // 选择标记
    const currentSelect = ref(0)
    watch(currentSelect, val => {
      ctx.emit('skuChange', val)
    })
    return { currentSelect }
  },
})
</script>

<style lang="scss"></style>
