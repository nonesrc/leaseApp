<template>
  <div class="lease-home">
    <van-image width="100" fit="cover" height="100" src="./icon.png" />
    <div class="banner">
      {{ userSelectedShop.shop_name }}
    </div>
    <div class="change-shop">
      <van-button size="small" @click="reShowSelectShop(true)"
        >更换门店</van-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { coreStateKey } from '../../state'
import { Image as VanImage, Button } from 'vant'

export default defineComponent({
  name: 'lease_home',
  components: {
    [Button.name]: Button,
    [VanImage.name]: VanImage,
  },
  setup() {
    const {
      user: {
        state: { userSelectedShop },
      },
      controler: {
        mutations: { reShowSelectShop },
      },
    } = inject(coreStateKey)
    return { userSelectedShop, reShowSelectShop }
  },
})
</script>

<style lang="scss">
.lease-home {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  min-height: calc(100vh - 104px);
  .banner {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
  .change-shop {
    margin-top: 10px;
  }
}
</style>
