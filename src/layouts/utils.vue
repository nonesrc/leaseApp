<template>
  <div class="layout-utils">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <slot name="content"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NavBar } from 'vant'
export default defineComponent({
  name: 'layout_utils',
  components: {
    [NavBar.name]: NavBar,
  },
  setup() {
    // TEST
    const onClickLeft = () => {}
    const onClickRight = () => {}
    return { onClickLeft, onClickRight }
  },
})
</script>

<style lang="scss">
.layout-utils {
  min-height: 100vh;
}
</style>
