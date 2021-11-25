<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="lease-goods">
      <van-swipe :autoplay="3000" lazy-render indicator-color="#ff4c29">
        <van-swipe-item
          v-for="image in currentGoodsDetails.slide_show_array"
          :key="image"
        >
          <van-image fit="scale-down" width="100%" height="100%" :src="image" />
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
                :amount="
                  currentGoodsDetails.sale_type === 0
                    ? currentGoodsDetails.rent_money
                    : currentGoodsDetails.market_price
                "
                :fontColor="'#ff4c29'"
                :unit="currentGoodsDetails.unit"
              />
              <Price
                :amount="currentGoodsDetails.deposit"
                :fontSise="12"
                :fontColor="'#6c757d'"
                unit="天"
                v-if="currentGoodsDetails.sale_type === 0"
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
      <van-tabs v-model:active="currentTabs" color="#ff4c29" sticky animated>
        <van-tab name="details">
          <template #title>详情</template>
          <div class="goods-details-img">
            <van-image
              :src="img"
              v-for="img in currentGoodsDetails.deatil_imgs"
              :key="img"
              fit="scale-down"
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
        <van-action-bar-icon text="客服">
          <template #icon
            ><Icon size="20"><MessageDots /></Icon
          ></template>
        </van-action-bar-icon>
        <van-action-bar-icon text="购物车">
          <template #icon
            ><Icon size="20"><ShoppingCartPlus /></Icon
          ></template>
        </van-action-bar-icon>
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
import { computed, defineComponent, ref, unref } from 'vue'
import useShop from '../../composable/shop'
import router from '../../routers'
import { resolveMoney } from '../../utils/helper'
import Sku from './goods/sku.vue'
import Price from '../public/price.vue'
import { MessageDots, ShoppingCartPlus } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
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
  Image as VanImage,
  Loading,
  ConfigProvider,
} from 'vant'

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
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [ConfigProvider.name]: ConfigProvider,
    Sku,
    Price,
    Icon,
    MessageDots,
    ShoppingCartPlus,
  },
  setup() {
    const { currentGoodsDetails, getGoodsDetails } = useShop()
    // 当前商品id
    const currentGoodsId = computed(
      () => router.currentRoute.value.query['goods_id']
    )
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
      if (currentGoodsId.value) {
        await getGoodsDetails(unref(currentGoodsId))
      } else {
        router.push({ name: 'sort' })
      }
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
    padding: math.div($g-1, 2) $g-1;
    margin-bottom: $g-1;
    margin-top: math.div($g-1, 2);
    background: $font-color-2;
    border-radius: 3px;
    font-size: 18px;
  }
  .goods-price {
    display: flex;
    color: $color-g-3;
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
    color: $color-g-3;
    font-size: 14px;
  }
  .goods-details-img {
    .van-image {
      display: block;
    }
  }
}
</style>
