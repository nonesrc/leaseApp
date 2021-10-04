<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-sku">
      <van-action-sheet
        v-model:show="showSheet"
        :round="false"
        :close-on-click-overlay="false"
        @click-overlay="closeSheetHandle"
      >
        <div class="sku-box">
          <div class="goods-info">
            <van-image
              :src="'http://dummyimage.com/360x360/f2ec79/png&text=bnscwg'"
              alt="商品缩略图"
              width="80"
              height="80"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" :vertical="true" />
              </template>
            </van-image>
          </div>
          <div class="sku-content">
            <van-cell-group :border="false">
              <van-cell
                :border="false"
                v-for="(sku, index) in SKU_TEST.skus"
                :key="index"
              >
                <template #title>
                  {{ sku.banner }}
                </template>
                <template v-slot:[sku.slotTarget]>
                  <component
                    :is="SKU[sku.type]"
                    :recordList="sku.records"
                    @skuChange="val => (userRecords[sku.key] = val)"
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </div>
        <template #cancel> <div>确定</div> </template>
      </van-action-sheet>
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SKU from './sku/SKU'
import {
  ActionSheet,
  Image as VanImage,
  Loading,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  ConfigProvider,
} from 'vant'
import SKU_TEST from '../../../test/sku.json'
export default defineComponent({
  name: 'lease_sku',
  components: {
    [ActionSheet.name]: ActionSheet,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [ConfigProvider.name]: ConfigProvider,
  },
  props: {
    showSheet: {
      type: Boolean,
      required: false,
      default: true,
    },
    closeSheetHandle: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  setup() {
    // css配置
    const themeVars = {
      actionSheetCancelPaddingTop: 0,
    }
    const userRecords = ref({})
    !(async () => {
      SKU_TEST.skus.forEach(function (sku) {
        if (sku.type === 'SKU_slider' || sku.type === 'SKU_selector') {
          userRecords.value[sku.key] = 0
          sku.slotTarget = 'label'
        }
        if (sku.type === 'SKU_counter') {
          userRecords.value[sku.key] = sku.records.min
          sku.slotTarget = 'value'
        }
      })
    })()
    return {
      SKU,
      themeVars,
      userRecords,
      SKU_TEST,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';
.lease-sku {
  .sku-box {
    .goods-info {
      padding: $g-1;
      padding-bottom: 0;
    }
  }
}
</style>
