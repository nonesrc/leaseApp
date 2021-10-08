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
              <van-field v-model="nick_name" label="收件人" :border="false" />
              <van-field
                v-model="phone"
                type="tel"
                label="联系电话"
                :border="false"
              />
              <van-field
                v-model="address"
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
              <section class="shop-overview">
                <van-image
                  src="http://dummyimage.com/150x150/3498db/png&text=deelter"
                  height="80"
                  width="80"
                  fit="cover"
                >
                  <template v-slot:loading>
                    <van-loading size="20" :vertical="true" />
                  </template>
                </van-image>
                <div class="shop-status">
                  <div class="van-ellipsis">{{ pickerShopInfo.shop_name }}</div>
                  <div>
                    <van-tag
                      :color="
                        pickerShopInfo.in_business ? '#27ae60' : '#2c394b'
                      "
                      >{{
                        pickerShopInfo.in_business ? '营业中' : '已休业'
                      }}</van-tag
                    >
                  </div>
                  <div>
                    <van-icon name="phone" />
                    {{ pickerShopInfo.shop_contact }} ({{
                      pickerShopInfo.shop_owner
                    }})
                  </div>
                </div>
              </section>
              <van-field
                v-model="pickerShopInfo.shop_address"
                rows="1"
                type="textarea"
                autosize
                disabled
              />
            </template>
          </div>
        </div>
      </div>
      <OrderList />
      <van-cell-group>
        <van-cell
          title="总价"
          label="购买商品总价(不包括租赁商品)"
          :center="true"
        >
          <template #value> <Price :amount="1" /> </template
        ></van-cell>
        <van-cell title="运输" label="上门送还花费" :center="true">
          <template #value>
            <Price :amount="1243" />
          </template>
        </van-cell>
        <van-cell title="押金" label="总押金" :center="true">
          <template #value>
            <Price :amount="0" />
          </template>
        </van-cell>
        <van-cell title="租赁" label="所有商品租赁计费(元/天)" :center="true">
          <template #value> <Price :amount="9812" /> </template
        ></van-cell>
      </van-cell-group>
      <van-submit-bar
        disabled
        :price="3050"
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
import { defineComponent, ref } from 'vue'
import OrderList from './check_order_list.vue'
import Price from '../../public/price.vue'
import {
  Field,
  CellGroup,
  Cell,
  Tab,
  Tabs,
  Image as VanImage,
  Loading,
  ConfigProvider,
  Tag,
  Icon,
  SubmitBar,
} from 'vant'
import { getPickerShop_API } from '../../../api'
import { axiosDataResolveHandle } from '../../../utils/helper'
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
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar,
    OrderList,
    Price,
  },
  setup() {
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
    //  联系人微信昵称
    const nick_name = ref('')
    // 联系电话
    const phone = ref('')
    // 地址
    const address = ref('')

    // 提交订单
    const onSubmitOrder = () => {}
    return {
      themeVars,
      transportType,
      shopReady,
      pickerShopInfo,
      nick_name,
      phone,
      address,
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
        .shop-overview {
          display: flex;
          .shop-status {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin-left: $g-1;
            flex-grow: 1;
            color: $font-color-7;
            div:nth-child(1) {
              font-size: 15px;
              font-weight: bold;
            }
            div:nth-child(3) {
              margin-top: $g-1;
              font-size: 13px;
              color: $font-color-6;
            }
          }
        }
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
