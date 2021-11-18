<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="layout-utils">
      <van-nav-bar
        :title="title"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <Icon size="22"><ArrowBack /></Icon><span> 返回</span>
        </template>
      </van-nav-bar>
      <slot name="content"></slot>
    </div>
  </van-config-provider>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { ArrowBack } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import router from '../routers'
import { NavBar, ConfigProvider } from 'vant'

export default defineComponent({
  name: 'layout_utils',
  components: {
    [NavBar.name]: NavBar,
    [ConfigProvider.name]: ConfigProvider,
    Icon,
    ArrowBack,
  },
  setup() {
    // 顶部栏颜色配置
    const themeVars = {
      navBarTextColor: '#2c394b',
      navBarIconColor: '#2c394b',
    }
    // 标题
    const title = computed(() => {
      return router.currentRoute.value.meta.title || ''
    })
    // TEST
    const onClickLeft = () => {
      router.go(-1)
    }
    const onClickRight = () => {}

    return { themeVars, title, onClickLeft, onClickRight }
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
