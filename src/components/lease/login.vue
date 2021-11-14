<template>
  <div class="lease-login">登录页</div>
</template>

<script>
import { defineComponent, onMounted, inject } from 'vue'
import router from '../../routers'
import { userLogin_API } from '../../api'
import { axiosDataResolveHandle } from '../../utils/helper'
import { coreStateKey } from '../../state'
import { Empty } from 'vant'

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
      const token = localStorage.getItem('Authorization')
      const { success, data } = axiosDataResolveHandle(
        await userLogin_API(code)
      )
      if (success) {
        localStorage.setItem('Authorization', data.token)
        delete data.token
        console.log(data)
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
