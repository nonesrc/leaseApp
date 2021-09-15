<template>
  <MainLayout
    ><template #content>
      <router-view></router-view>
    </template>
  </MainLayout>
</template>

<script>
import { defineComponent } from 'vue'
import MainLayout from '../layouts/main.vue'
export default defineComponent({
  name: 'lease_entrance',
  components: {
    MainLayout,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
