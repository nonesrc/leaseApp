<template>
  <div class="lease-login">登录页</div>
</template>

<script>
import { defineComponent, onMounted, inject } from 'vue'
import router from '../../routers'
import { userLogin_API } from '../../api'
import { axiosDataResolveHandle } from '../../utils/helper'
import { coreStateKey } from '../../state'
import { Empty, Toast } from 'vant'

export default defineComponent({
  name: 'lease_login',
  components: {
    [Empty.name]: Empty,
  },
  setup() {
    const {
      user: {
        mutations: { reCurrentUser },
      },
    } = inject(coreStateKey)
    const { code } = router.currentRoute.value.query
    onMounted(async () => {
      const { success, data } = axiosDataResolveHandle(
        await userLogin_API(code)
      )
      if (success) {
        reCurrentUser(data)
      }
    })
    return {}
  },
})
</script>

<style lang="scss">
.lease-login {
  height: 100vh;
}
</style>
