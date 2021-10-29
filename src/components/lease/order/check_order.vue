<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-check-order">
      <div class="goods-transport">
        <van-tabs
          v-model:active="transportType"
          type="card"
          title-inactive-color="#082032"
          color="#082032"
        >
          <van-tab title="自取自还" name="self"> </van-tab>
          <van-tab title="上门送还" name="no_self"> </van-tab>
        </van-tabs>
        <div class="tab-content">
          <!-- no_self -->
          <div class="transport-user" v-if="transportType === 'no_self'">
            <van-cell-group :border="false" inset>
              <van-field
                v-model="userContact.nick_name"
                label="收件人"
                :border="false"
              />
              <van-field
                v-model="userContact.phone"
                type="tel"
                label="联系电话"
                :border="false"
              />
              <van-field
                v-model="userContact.address"
                rows="2"
                autosize
                label="收件人地址"
                type="textarea"
                :border="false"
              />
            </van-cell-group>
          </div>
          <!-- self -->
          <div class="transport-shop" v-else-if="transportType === 'self'">
            <van-loading :vertical="true" v-if="!shopReady" />
            <template v-else>
              <ShopCard :pickerShopInfo="pickerShopInfo"
            /></template>
          </div>
        </div>
        <DatePicker :transportType="transportType" />
      </div>
      <CheckOrderList
        :goodsInfo="goodsInfo"
        :userRecords="userRecords"
        :skuString="skuString"
        :isRentGoods="isRentGoods"
      />
      <van-cell-group>
        <van-cell title="售价" label="非租赁商品" :center="true">
          <template #value> <Price :amount="0" /> </template
        ></van-cell>
        <van-cell title="运输" label="上门送还花费" :center="true">
          <template #value>
            <Price :amount="transportType !== 'self' ? goodsInfo.freight : 0" />
          </template>
        </van-cell>
        <van-cell title="押金" label="租赁商品押金" :center="true">
          <template #value>
            <Price :amount="goodsInfo.deposit" />
          </template>
        </van-cell>
        <van-cell title="租赁" label="商品租赁计费(元/天)" :center="true">
          <template #value> <Price :amount="goodsInfo.rent_money" /> </template
        ></van-cell>
      </van-cell-group>
      <van-submit-bar
        disabled
        :price="
          (isRentGoods ? goodsInfo.deposit : 0) +
          (transportType !== 'self' ? goodsInfo.freight : 0)
        "
        :tip="transportType === 'no_self' ? '上门送还需正确填写个人信息' : ''"
        tip-icon="info-o"
        @submit="onSubmitOrder"
      >
        <template #button>
          <div class="submit-order-btn">提交订单</div>
        </template>
      </van-submit-bar>
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import CheckOrderList from './check_order_list.vue'
import DatePicker from './date_picker.vue'
import Price from '../../public/price.vue'
import ShopCard from '../shop/shop_card.vue'
import {
  Field,
  CellGroup,
  Cell,
  Tab,
  Tabs,
  Image as VanImage,
  Loading,
  ConfigProvider,
  SubmitBar,
} from 'vant'
import { getPickerShop_API } from '../../../api'
import { axiosDataResolveHandle } from '../../../utils/helper'
import router from '../../../routers'
export default defineComponent({
  name: 'lease_check_order',
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [ConfigProvider.name]: ConfigProvider,
    [SubmitBar.name]: SubmitBar,
    CheckOrderList,
    Price,
    DatePicker,
    ShopCard,
  },
  setup() {
    // 商品信息
    const goodsInfo = ref({})
    // 用户sku信息
    const userRecords = ref({})
    // skuString
    const skuString = ref('')
    try {
      let {
        gooosInfo: goods_info,
        sku,
        userRecords: user_records,
      } = router.currentRoute.value.params
      goodsInfo.value = JSON.parse(goods_info)
      skuString.value = sku
      userRecords.value = JSON.parse(user_records)
    } catch (error) {
      router.push({ name: 'lease_sort' })
    }

    // CSS
    const themeVars = {
      badgeBorderWidth: 0,
      submitBarTipBackgroundColor: '#adb5bd',
      submitBarTipColor: '#2c394b',
      submitBarPriceColor: '#2c394b',
    }
    // 用户选择运输类型
    const transportType = ref('self')
    // 自取商铺是否准备完成
    const shopReady = ref(false)
    // 自取商铺信息
    const pickerShopInfo = ref({})

    !(async () => {
      if (!shopReady.value) {
        const { success, data } = axiosDataResolveHandle(
          await getPickerShop_API('123123123')
        )
        if (success) {
          pickerShopInfo.value = data
          shopReady.value = true
        }
      }
    })()

    // 是否是租赁商品
    const isRentGoods = computed(() => {
      return goodsInfo.value.hasOwnProperty('deposit')
    })
    // no_self用户联系信息
    const userContact = ref({
      nick_name: '',
      phone: '',
      address: '',
    })
    // 提交订单
    const onSubmitOrder = () => {}

    return {
      themeVars,
      transportType,
      shopReady,
      goodsInfo,
      isRentGoods,
      userRecords,
      skuString,
      pickerShopInfo,
      userContact,
      onSubmitOrder,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';
.lease-check-order {
  padding-bottom: 86px;
  .goods-transport {
    background-image: linear-gradient(to bottom, #dee2e6, #e7e9ec, #ffffff);
    padding: $g-2 0;
    .tab-content {
      padding-top: $g-1;
      .transport-shop {
        margin: 0 $g-2;
        padding: $g-1;
        background: #fff;
        border-radius: 10px;
        .van-cell {
          padding: 0;
          padding-top: $g-1;
        }
      }
    }
  }
  .submit-order-btn {
    padding: math.div($g-1, 1.2) $g-2;
    border-radius: 5px;
    color: #fff;
    background-image: linear-gradient(
      to right top,
      #334756,
      #283d4d,
      #1e3344,
      #13293b,
      #082032
    );
  }
}
</style>
