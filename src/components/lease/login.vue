<template>
  <div class="lease-login"></div>
</template>

<script>
import { defineComponent } from 'vue'
import router from '../../routers'
import { Empty } from 'vant'

export default defineComponent({
  name: 'lease_login',
  components: {
    [Empty.name]: Empty,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
