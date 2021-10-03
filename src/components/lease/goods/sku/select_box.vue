<template>
  <div class="lease-sku-select-box">
    <van-tag
      :plain="currentSelect !== index"
      type="primary"
      size="large"
      color="#334756"
      v-for="(record, index) in recordlist"
      :key="index"
      @click="currentSelect = index"
      >{{ record.label }}</van-tag
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { Tag } from 'vant'
export default defineComponent({
  name: 'lease_sku_select_box',
  components: {
    [Tag.name]: Tag,
  },
  props: {
    recordlist: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    // 选择标记
    const currentSelect = ref(0)
    watch(currentSelect, val => {
      ctx.emit('selectionChange', val)
    })
    return { currentSelect }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../../assets/styles/index.scss';
.lease-sku-select-box {
  .van-tag {
    margin: math.div($g-1, 2);
  }
}
</style>
