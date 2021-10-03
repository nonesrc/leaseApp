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
              <span>租赁价格: </span>
              ¥ {{ resolveMoney(currentGoodsDetails._showPrice) }}
            </div>
            <div class="goods-unit">
              <span>计量方式: </span>
              {{ currentGoodsDetails.unit }}
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
          <template #title> <van-icon name="newspaper-o" /> 详情</template>
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
          <template #title> <van-icon name="comment-o" /> 评论</template>
        </van-tab>
      </van-tabs>
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon icon="cart-o" text="购物车" />
        <van-action-bar-button
          color="#6c757d"
          type="warning"
          text="加入购物车"
        />
        <van-action-bar-button color="#334756" type="danger" text="立即购买" />
      </van-action-bar>
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
    // 自定义主题
    const themeVars = {
      swipeIndicatorActiveBackgroundColor: '#2c394b',
      swipeIndicatorInactiveBackgroundColor: '#6c757d',
    }
    !(async () => {
      await getGoodsDetails('13123213')
    })()
    return { themeVars, currentGoodsDetails, resolveMoney, currentTabs }
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
  .goods-price,
  .goods-unit {
    color: $color-g-2;
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: math.div($g-1, 2);
    span {
      font-size: 14px;
      color: $font-color-6;
    }
    &.goods-unit {
      font-size: 14px;
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
