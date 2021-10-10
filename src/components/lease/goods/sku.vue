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
                      ? ': ' +
                        sku.records[
                          sku.records
                            .map(r => r.id)
                            .indexOf(userRecords[sku.key])
                        ].label
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
          <div style="padding: 0 10px; margin-top: 20px">
            <van-button
              @click.stop="orderConfirmed"
              block
              color="#2c394b"
              size="middle"
              >确认</van-button
            >
          </div>
        </div>
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
  Button,
  Toast,
  ConfigProvider,
} from 'vant'
import router from '../../../routers'
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
    [Button.name]: Button,
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
  setup(props) {
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
    // 确认租赁起始时间
    const changeBeginTime = val => {
      userRecords.value.beginTime = val
    }
    // 确认租赁起始时间
    const changeEndTime = val => {
      userRecords.value.endTime = val
    }
    // 格式化sku展示
    const skuToString = () => {
      const includeSku = currentGoodsSku.value.filter(
        sku =>
          ['SKU_slider', 'SKU_selector'].includes(sku.type) &&
          !['height', 'weight'].includes(sku.key)
      )
      let skuDict = {}
      let result = []
      includeSku.forEach(sku => {
        sku.records.forEach(record => {
          skuDict[record.id] = record.label
        })
      })
      Object.values(userRecords.value).forEach(val => {
        skuDict[val] && result.push(skuDict[val])
      })
      return result.join(' ')
    }
    // 确认订单
    const orderConfirmed = () => {
      if (
        userRecords.value.beginTime === 0 ||
        userRecords.value.endTime === 0
      ) {
        return Toast.fail('请选择起始和结束时间')
      }
      if (userRecords.value.beginTime >= userRecords.value.endTime) {
        return Toast.fail('起始时间大于或等于结束时间！')
      }
      props.closeSheetHandle()
      console.log(skuToString())
      router.push({
        name: 'check_order',
        params: {
          gooosInfo: JSON.stringify(currentGoodsInfo.value),
          sku: skuToString(),
          userRecords: JSON.stringify(userRecords.value),
        },
      })
    }
    userRecords.value.beginTime = 0
    userRecords.value.endTime = 0
    return {
      SKU,
      themeVars,
      userRecords,
      skuReady,
      currentGoodsInfo,
      currentGoodsSku,
      getGoodsSku,
      changeBeginTime,
      changeEndTime,
      orderConfirmed,
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
