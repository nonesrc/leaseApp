<template>
  <router-view></router-view>
  <ShopSelecter />
</template>

<script>
import { defineComponent, provide } from 'vue'
import ShopSelecter from './components/public/shop_selecter.vue'
import { coreState, coreStateKey } from './state'

export default defineComponent({
  name: 'APP',
  components: {
    ShopSelecter,
  },
  setup() {
    provide(coreStateKey, coreState)
    return {}
  },
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>
