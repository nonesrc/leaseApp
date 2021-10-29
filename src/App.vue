<template>
  <router-view></router-view>
  <van-overlay
    class-name="select-shop"
    :show="showSelectShop"
    @click="onCloseOverlay"
    :lock-scroll="false"
    z-index="100"
  >
    <van-cell-group inset @click.stop="">
      <div class="banner">选择门店</div>

      <van-list
        :finished="true"
        finished-text="没有更多了"
        class="select-shop-list"
      >
        <van-cell
          v-for="shop in selectShopList"
          :key="shop.shop_id"
          @click="onSelectedShop(shop)"
        >
          <template #value><ShopCard :pickerShopInfo="shop" /></template>
        </van-cell>
      </van-list>
    </van-cell-group>
  </van-overlay>
</template>

<script>
import { defineComponent, onMounted, provide, ref, unref } from 'vue'
import { coreState, coreStateKey } from './state'
import { getShopList_API } from './api'
import { axiosDataResolveHandle, checkShopValid } from './utils/helper'
import ShopCard from './components/lease/shop/shop_card.vue'
import { Overlay, Cell, CellGroup, List } from 'vant'

export default defineComponent({
  name: 'APP',
  components: {
    [Overlay.name]: Overlay,
    [Cell.name]: Cell,
    [List.name]: List,
    [CellGroup.name]: CellGroup,
    ShopCard,
  },
  setup() {
    const {
      user: {
        mutations: { reUserSelectdeShop },
      },
    } = coreState
    provide(coreStateKey, coreState)
    // localStorage数据
    const userSelectedShopInfo = localStorage.getItem('selected_shop') || '{}'
    // 是否展示商铺选择
    const showSelectShop = ref(false)
    // 可选择商铺列表
    const selectShopList = ref([])
    // 选择动作
    const onSelectedShop = shop => {
      if (checkShopValid(shop)) {
        localStorage.setItem('selected_shop', JSON.stringify(shop))
        reUserSelectdeShop(shop)
        showSelectShop.value = false
      }
    }
    // 关闭遮罩层
    const onCloseOverlay = () => {
      if (checkShopValid(JSON.parse(userSelectedShopInfo))) {
        showSelectShop.value = true
      }
    }
    onMounted(async () => {
      if (!checkShopValid(JSON.parse(userSelectedShopInfo))) {
        const { success, data } = axiosDataResolveHandle(
          await getShopList_API()
        )
        if (success) {
          selectShopList.value = data
        }
        showSelectShop.value = true
      } else {
        reUserSelectdeShop(JSON.parse(userSelectedShopInfo))
      }
    })
    return { showSelectShop, selectShopList, onCloseOverlay, onSelectedShop }
  },
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
.select-shop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .banner {
    text-align: center;
    padding: 10px 0;
    font-size: 18px;
  }
  .select-shop-list {
    overflow: auto;
    height: 400px;
  }
}
</style>
