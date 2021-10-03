<template>
  <van-config-provider :theme-vars="themeVars">
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
  </van-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { NavBar, ConfigProvider } from 'vant'
export default defineComponent({
  name: 'layout_utils',
  components: {
    [NavBar.name]: NavBar,
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    // 顶部栏颜色配置
    const themeVars = {
      navBarTextColor: '#2c394b',
      navBarIconColor: '#2c394b',
    }
    // TEST
    const onClickLeft = () => {}
    const onClickRight = () => {}
    return { themeVars, onClickLeft, onClickRight }
  },
})
</script>

<style lang="scss">
@import '../assets/styles/palette.scss';
.layout-utils {
  min-height: 100vh;
  background: $font-color-1;
}
</style>
