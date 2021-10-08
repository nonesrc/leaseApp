<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-sku">
      <van-action-sheet
        v-model:show="showSheet"
        :round="false"
        :close-on-click-overlay="false"
        @click-overlay="closeSheetHandle"
        @opened="() => !skuReady && getGoodsSku()"
      >
        <van-loading v-if="!skuReady" :vertical="true" />
        <div class="sku-box" v-else>
          <div class="goods-info">
            <van-image
              :src="currentGoodsInfo.main_img"
              :alt="currentGoodsInfo.goods_name"
              width="80"
              height="80"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" :vertical="true" />
              </template>
            </van-image>
            <div class="goods_name">{{ currentGoodsInfo.goods_name }}</div>
          </div>
          <div class="sku-content">
            <van-cell-group :border="false">
              <van-cell
                :border="false"
                v-for="(sku, index) in currentGoodsSku"
                :key="index"
              >
                <template #title>
                  {{
                    sku.banner +
                    (Array.isArray(sku.records)
                      ? ': ' + sku.records[userRecords[sku.key]].label
                      : '')
                  }}
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
            <component
              :is="SKU['SKU_timer']"
              @changeBeginTime="changeBeginTime"
              @changeEndTime="changeEndTime"
            ></component>
          </div>
        </div>
        <template #cancel> <div>确定</div> </template>
      </van-action-sheet>
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import useSku from '../../../composable/sku'
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
    const {
      skuReady,
      currentGoodsInfo,
      currentGoodsSku,
      getGoodsSku,
      userRecords,
    } = useSku('12312312321')
    // css配置
    const themeVars = {
      actionSheetCancelPaddingTop: 0,
    }
    return {
      SKU,
      themeVars,
      userRecords,
      skuReady,
      currentGoodsInfo,
      currentGoodsSku,
      getGoodsSku,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';
.lease-sku {
  .van-loading {
    padding-top: $g-2;
    padding-bottom: $g-1;
  }
  .sku-box {
    .goods-info {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      padding: $g-1;
      padding-bottom: 0;
      .goods_name {
        padding: math.div($g-1, 2);
        flex-grow: 1;
      }
    }
  }
}
</style>
