<template>
  <div class="lease-mine">
    <div class="flexc mine-img">
      <van-image
        width="64px"
        height="64px"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="username">zRain</div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="orders-o" text="订单" :to="{ name: 'orders' }" />
      <van-grid-item icon="cart-o" text="购物车" :to="{ name: 'cart' }" />
      <van-grid-item icon="newspaper-o" text="通知" :to="{ name: 'message' }" />
    </van-grid>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Col, Row, Cell, Image, Grid, GridItem } from 'vant'
export default defineComponent({
  name: 'lease_mine',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.lease-mine {
  .mine-img {
    flex-direction: column;
    background-image: linear-gradient(
      to right top,
      #334756,
      #283d4d,
      #1e3344,
      #13293b,
      #082032
    );
    padding: $g-2;
    .username {
      line-height: 100%;
      font-weight: bold;
      font-size: 15px;
      margin-top: $g-1;
      color: $font-color-2;
    }
  }
}
</style>
