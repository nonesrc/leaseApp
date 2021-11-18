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
      <van-grid-item text="订单" :to="{ name: 'orders' }">
        <template #icon>
          <Icon size="25"><Notes /></Icon>
        </template>
      </van-grid-item>
      <van-grid-item text="购物车" :to="{ name: 'cart' }">
        <template #icon>
          <Icon size="25"><ShoppingCart /></Icon>
        </template>
      </van-grid-item>
      <van-grid-item text="通知" :to="{ name: 'message' }">
        <template #icon>
          <Icon size="25"><BellRinging /></Icon>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notes, ShoppingCart, BellRinging } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
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
    Icon,
    Notes,
    ShoppingCart,
    BellRinging,
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
    box-sizing: border-box;
    height: 250px;
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
