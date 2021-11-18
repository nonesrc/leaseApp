<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-goods">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item
          v-for="image in currentGoodsDetails.slide_show_array"
          :key="image"
        >
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 商品价格 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <div class="goods-name">
              {{ currentGoodsDetails.goods_name }}
            </div></template
          >
          <template #label>
            <div class="goods-price">
              <Price
                :amount="currentGoodsDetails._showPrice"
                :unit="currentGoodsDetails.unit"
              />
              <Price
                :amount="currentGoodsDetails.deposit"
                :fontSise="12"
                :fontColor="'#6c757d'"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 店铺 -->
      <van-cell-group :border="false">
        <van-cell>
          <template #title>
            <div class="shop-name">
              <span> {{ currentGoodsDetails.shop_name }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 商品详情 & 评论 -->
      <van-tabs v-model:active="currentTabs" color="#082032" sticky animated>
        <van-tab name="details">
          <template #title>详情</template>
          <div class="goods-details-img">
            <van-image
              :src="img"
              v-for="img in currentGoodsDetails.deatil_imgs"
              :key="img"
              alt="商品详情"
              width="100%"
              height="360"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" :vertical="true" />
              </template>
            </van-image>
          </div>
        </van-tab>
        <van-tab name="comment">
          <template #title>评论</template>
        </van-tab>
      </van-tabs>
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon icon="cart-o" text="购物车" />
        <van-action-bar-button color="#6c757d" text="加入购物车" />
        <van-action-bar-button
          color="#334756"
          text="立即购买"
          @click="isShowSkuSheet = true"
        />
      </van-action-bar>
      <Sku
        :showSheet="isShowSkuSheet"
        :closeSheetHandle="() => (isShowSkuSheet = false)"
      />
    </div>
  </van-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Tab,
  Tabs,
  Icon,
  Image as VanImage,
  Loading,
  ConfigProvider,
} from 'vant'
import useGoods from '../../composable/goods'
import router from '../../routers'
import { resolveMoney } from '../../utils/helper'
import Sku from './goods/sku.vue'
import Price from '../public/price.vue'

export default defineComponent({
  name: 'lease_goods',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionBar.name]: ActionBar,
    [ActionBarIcon.name]: ActionBarIcon,
    [ActionBarButton.name]: ActionBarButton,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [ConfigProvider.name]: ConfigProvider,
    Sku,
    Price,
  },
  setup() {
    const {
      currentRentGoodsDetails,
      currentSellGoodsDetails,
      getGoodsDetails,
    } = useGoods()
    // 当前商品类型标识（租赁/出售）
    const currentGoodsDetails =
      router.currentRoute.value.meta.tag === 'rent'
        ? currentRentGoodsDetails
        : currentSellGoodsDetails
    // 当前标签状态
    const currentTabs = ref('details')
    // 是否展示Sku
    const isShowSkuSheet = ref(false)
    // 自定义主题
    const themeVars = {
      swipeIndicatorActiveBackgroundColor: '#2c394b',
      swipeIndicatorInactiveBackgroundColor: '#6c757d',
    }
    !(async () => {
      await getGoodsDetails('13123213')
    })()
    return {
      themeVars,
      currentGoodsDetails,
      resolveMoney,
      currentTabs,
      isShowSkuSheet,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../assets/styles/index.scss';
.lease-goods {
  padding-bottom: 50px;
  & > .van-swipe {
    height: 360px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .goods-name {
    font-size: 18px;
    font-weight: bolder;
    margin-top: math.div($g-1, 2);
    margin-bottom: $g-1;
  }
  .goods-price {
    display: flex;
    color: $color-g-2;
    font-size: 17px;
    margin-bottom: math.div($g-1, 2);
    & > *:nth-child(2) {
      margin-left: auto;
    }
  }
  .shop-name {
    display: flex;
    align-items: center;
    height: 30px;
    color: $color-g-2;
    font-size: 14px;
  }
  .goods-details-img {
    .van-image {
      display: block;
    }
  }
}
</style>
