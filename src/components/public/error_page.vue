<template>
  <div class="lease-error-page">
    <section class="flexc">
      <van-image width="100" fit="cover" height="100" src="./error_page.png" />
    </section>
    <section>错误！页面不存在</section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Image as VanImage } from 'vant'

export default defineComponent({
  name: 'lease_error_page',
  components: {
    VanImage,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.lease-error-page {
  section {
    text-align: center;
    &:nth-child(1) {
      margin-top: 3em;
    }
    &:nth-child(2) {
      margin-top: 2em;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
