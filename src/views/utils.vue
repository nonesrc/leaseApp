<template>
  <UtilsLayout
    ><template #content>
      <router-view></router-view>
    </template>
  </UtilsLayout>
</template>

<script>
import { defineComponent } from 'vue'
import UtilsLayout from '../layouts/utils.vue'
export default defineComponent({
  name: 'lease_entrance',
  components: {
    UtilsLayout,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
