<template>
  <div class="lease-order-details">
    <div class="banner flexc">
      <van-icon name="success" /> <span>交易完成</span
      ><span>订单编号:11231241241</span>
    </div>

    <div class="transport-content">
      <!-- no_self -->
      <div class="transport-user" v-if="transportType === 'no_self'">
        <van-cell-group :border="false" inset>
          <van-cell title="收件人" value="zRain" :border="false" />
          <van-cell title="联系电话" value="16374875698" :border="false" />
          <van-cell
            title="收件人地址"
            value="成都信息工程大学 二食堂二楼"
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
              <div class="van-ellipsis">deelter 专卖店（成信店）</div>
              <div>
                <van-tag color=" #27ae60">营业中</van-tag>
              </div>
              <div>
                <van-icon name="phone" />
                17384756534 deelter
              </div>
            </div>
          </section>
          <van-field
            v-model="texts"
            rows="1"
            type="textarea"
            autosize
            disabled
          />
        </template>
      </div>
    </div>

    <CheckOrderList />
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
    <div class="btn-group">
      <van-button block round color="#334756">立即支付</van-button>
      <van-button block round color="#334756">申请退款</van-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Price from '../../public/price.vue'
import CheckOrderList from './check_order_list.vue'
import {
  Icon,
  Cell,
  CellGroup,
  Loading,
  Image as VanImage,
  Tag,
  Field,
  Button,
} from 'vant'
export default defineComponent({
  name: 'lease_order_details',
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
    [Tag.name]: Tag,
    [Field.name]: Field,
    [Button.name]: Button,
    CheckOrderList,
    Price,
  },
  setup() {
    // 自取商店是否准备完成
    const shopReady = ref(true)
    // 当前商品运输类型
    const transportType = ref('self')

    // TEST
    const texts = ref('成都信息工程大学 二食堂二楼')
    return { shopReady, transportType, texts }
  },
})
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';
.lease-order-details {
  background: #fff;
  & > .banner {
    position: relative;
    height: 120px;
    flex-direction: column;
    color: #fff;
    background-image: linear-gradient(
      to right bottom,
      #334756,
      #314353,
      #2f4051,
      #2e3c4e,
      #2c394b
    );
    .van-icon {
      font-size: 30px;
      margin-bottom: $g-1;
    }
    span:nth-child(2),
    span:nth-child(3) {
      font-size: 14px;
    }
    span:nth-child(3) {
      margin-top: $g-1;
    }
  }
  .transport-content {
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
  .btn-group {
    padding: $g-2;
    .van-button:not(:last-child) {
      margin-bottom: $g-1;
    }
  }
}
</style>
