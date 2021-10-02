<template>
  <div class="lease-goods">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item
        v-for="image in currentGoodsDetails.slide_show_array"
        :key="image"
      >
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <section>
      <div class="goods-name">{{ currentGoodsDetails.goods_name }}</div>
      <div class="goods-price">
        ¥ {{ resolveMoney(currentGoodsDetails._showPrice) }}
      </div>
      <div class="van-hairline--bottom"></div>
      <div class="shop-name">
        <span> {{ currentGoodsDetails.shop_name }}</span>
      </div>
      <div class="van-hairline--bottom"></div>
    </section>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-button color="#6c757d" type="warning" text="加入购物车" />
      <van-action-bar-button color="#334756" type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
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
    !(async () => {
      await getGoodsDetails('13123213')
    })()
    return { currentGoodsDetails, resolveMoney }
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.lease-goods {
  .van-swipe {
    height: 360px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  section {
    .goods-name {
      font-size: 18px;
      font-weight: bolder;
      margin: $g-1 0;
    }
    .goods-price {
      color: $color-g-2;
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: $g-1;
    }
    .shop-name {
      display: flex;
      align-items: center;
      height: 50px;
      color: $color-g-2;
      font-size: 15px;
    }
    & > * {
      padding: 0 $g-1;
    }
  }
}
</style>
