<template>
  <div class="lease-home">
    <van-image width="100" fit="cover" height="100" src="./icon.png" />
    <div class="banner">
      {{ userSelectedShop.shop_name }}
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { Image as VanImage } from 'vant'
import { coreStateKey } from '../../state'
export default defineComponent({
  name: 'lease_home',
  components: {
    VanImage,
  },
  setup() {
    const {
      user: {
        state: { userSelectedShop },
      },
    } = inject(coreStateKey)
    return { userSelectedShop }
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
}
</style>
