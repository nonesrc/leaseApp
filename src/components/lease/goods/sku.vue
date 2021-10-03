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
              width="64"
              height="64"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" :vertical="true" />
              </template>
            </van-image>
          </div>
          <div class="sku-content">
            <van-cell-group :border="false">
              <!-- 体重 -->
              <van-cell
                :title="`身高(cm): ${heightLevel[skuHeight].label}`"
                :border="false"
              >
                <template #label>
                  <div class="sku-height">
                    <StepSlider
                      :recordList="heightLevel"
                      @selectionChange="val => (skuHeight = val)"
                    >
                    </StepSlider>
                  </div>
                </template>
              </van-cell>
              <!-- 身高 -->
              <van-cell
                :title="`体重(斤): ${weightLevel[skuWeight].label}`"
                :border="false"
              >
                <template #label>
                  <div class="sku-weight">
                    <StepSlider
                      :recordList="weightLevel"
                      @selectionChange="val => (skuWeight = val)"
                    >
                    </StepSlider>
                  </div>
                </template>
              </van-cell>
              <!-- 测试颜色单选 -->
              <van-cell title="颜色" :border="false">
                <template #label>
                  <SelectBox
                    :recordlist="colorSelect"
                    @selectionChange="val => (skuColor = val)"
                /></template>
              </van-cell>
              <!-- 测试大小单选 -->
              <van-cell title="大小" :border="false">
                <template #label>
                  <SelectBox
                    :recordlist="sizeSelect"
                    @selectionChange="val => (skuSize = val)"
                /></template>
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
import StepSlider from './sku/step_slider.vue'
import SelectBox from './sku/select_box.vue'
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
    StepSlider,
    SelectBox,
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
    //  身高尺码对应
    const heightLevel = [
      { tag: 'LV1', label: '140~149' },
      { tag: 'LV2', label: '150~159' },
      { tag: 'LV3', label: '160~169' },
      { tag: 'LV4', label: '170~179' },
      { tag: 'LV5', label: '180~190' },
    ]
    //  体重尺码对应
    const weightLevel = [
      { tag: 'LV1', label: '70~79' },
      { tag: 'LV2', label: '80~94' },
      { tag: 'LV3', label: '95~99' },
      { tag: 'LV4', label: '100~109' },
      { tag: 'LV5', label: '110~119' },
      { tag: 'LV6', label: '120~124' },
      { tag: 'LV7', label: '125~129' },
      { tag: 'LV8', label: '130~135' },
      { tag: 'LV9', label: '136~149' },
    ]
    // 颜色选项
    const colorSelect = [
      {
        label: '天蓝',
      },
      {
        label: '墨绿',
      },
      {
        label: '浅灰',
      },
      {
        label: '深红',
      },
      {
        label: '玄黑',
      },
    ]
    // 大小选项
    const sizeSelect = [
      {
        label: 'S',
      },
      {
        label: 'M',
      },
      {
        label: 'L',
      },
      {
        label: 'XL',
      },
      {
        label: '2XL',
      },
      {
        label: '3XL',
      },
    ]
    // 身高
    const skuHeight = ref(0)
    // 体重
    const skuWeight = ref(0)
    // 颜色
    const skuColor = ref(0)
    // 大小
    const skuSize = ref(0)
    return {
      themeVars,
      heightLevel,
      weightLevel,
      colorSelect,
      sizeSelect,
      skuHeight,
      skuWeight,
      skuColor,
      skuSize,
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
