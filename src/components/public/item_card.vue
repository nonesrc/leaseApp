<template>
  <div class="lease-item-card">
    <div class="icon">
      <van-image
        width="150px"
        height="150px"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div class="describe">
      <div class="van-multi-ellipsis--l2">这个是示例商品</div>
    </div>
    <div class="price"><span>¥</span>{{ price }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Image as VanImage } from 'vant'
export default defineComponent({
  name: 'lease_item_card',
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    icon: {
      type: String,
      required: false,
      default: 'https://www.example.com/items/example.png',
    },
    describe: {
      type: String,
      required: false,
      default: '暂无此商品描述',
    },
    price: {
      type: Number,
      required: false,
      default: 234,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.lease-item-card {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 150px;
  .describe {
    font-size: 13px;
  }
  .price {
    margin-top: auto;
    color: $color-o-1;
    span {
      font-size: 13px;
    }
  }
}
</style>
