<template>
  <div class="lease-sku-slider">
    <van-slider
      v-model="currentSelect"
      active-color="#334756"
      :step="100 / (recordList.length - 1)"
    >
      <template #button>
        <div class="custom-button">
          {{
            recordList[
              Math.round(currentSelect / (100 / (recordList.length - 1)))
            ].tag
          }}
        </div>
      </template>
    </van-slider>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { Slider } from 'vant'
export default defineComponent({
  name: 'lease_sku_slider',
  components: {
    [Slider.name]: Slider,
  },
  props: {
    recordList: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    // 选择标记
    const currentSelect = ref(0)
    watch(currentSelect, val => {
      ctx.emit(
        'skuChange',
        Math.round(val / (100 / (props.recordList.length - 1)))
      )
    })
    return { currentSelect }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../../assets/styles/index.scss';
.lease-sku-slider {
  margin-top: $g-1;
  padding: 0 $g-1;
  .custom-button {
    color: #fff;
    padding: 0 math.div($g-1, 2);
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    background-color: #334756;
    border-radius: 100px;
  }
}
</style>
