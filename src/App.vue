<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, provide } from 'vue'
import { coreState, coreStateKey } from './state'
export default defineComponent({
  components: {},
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
