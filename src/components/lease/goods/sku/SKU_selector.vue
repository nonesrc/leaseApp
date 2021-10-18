<template>
  <div class="lease-sku-selector">
    <van-tag
      :plain="currentSelect !== record.id"
      type="primary"
      size="large"
      color="#334756"
      v-for="(record, index) in recordList"
      :key="index"
      @click="currentSelect = record.id"
      >{{ record.label }}</van-tag
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { Tag } from 'vant'
export default defineComponent({
  name: 'lease_sku_selector',
  components: {
    [Tag.name]: Tag,
  },
  props: {
    recordList: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    // 选择标记
    const currentSelect = ref(props.recordList[0].id)
    watch(currentSelect, val => {
      ctx.emit('skuChange', val)
    })
    return { currentSelect }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../../assets/styles/index.scss';
.lease-sku-selector {
  .van-tag {
    margin: math.div($g-1, 2);
  }
}
</style>
