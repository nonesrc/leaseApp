<template>
  <van-cell-group inset class="lease-date-picker">
    <van-cell
      :title="transportType === 'self' ? '选择自取日期' : '选择上门日期'"
      :value="datePicked"
      @click="showDate = true"
      is-link
      center
    />
    <van-cell
      :title="transportType === 'self' ? '选择自取时间段' : '选择上门时间段'"
      center
    >
      <template #value>
        <van-popover
          v-model:show="showDatePopover"
          :actions="dateList"
          @select="(a, i) => (timePicked = i)"
        >
          <template #reference>
            <div class="flexc" style="width: 100%">
              <van-button color="#334756" block size="small">{{
                timePicked !== -1
                  ? dateList[timePicked].text
                  : transportType === 'self'
                  ? '选择自取日期'
                  : '选择上门日期'
              }}</van-button>
            </div>
          </template>
        </van-popover>
      </template>
    </van-cell>
  </van-cell-group>
  <van-calendar
    v-model:show="showDate"
    @confirm="onConfirmTime"
    color="#334756"
    :max-date="
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 6
      )
    "
  />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { dateFormat } from '../../../utils/helper'
import { Calendar, Popover, Button, Cell, CellGroup } from 'vant'
export default defineComponent({
  name: 'lease_date_picker',
  components: {
    [Calendar.name]: Calendar,
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  props: {
    transportType: {
      type: String,
      required: true,
      default: 'self',
    },
    dateList: {
      type: Array,
      required: false,
      default: [],
    },
  },
  setup() {
    // 用户选择日期
    const datePicked = ref()
    const timePicked = ref(-1)
    // 是否展示日期组件
    const showDate = ref(false)
    // 是是否展示日历弹窗
    const showDatePopover = ref(false)
    // 提交时间
    const onConfirmTime = time => {
      datePicked.value = dateFormat('Y年m月d日', time)
      showDate.value = false
    }
    return {
      onConfirmTime,
      datePicked,
      timePicked,
      showDate,
      showDatePopover,
    }
  },
})
</script>

<style lang="scss">
@use 'sass:math';
@import '../../../assets/styles/index.scss';
.lease-date-picker {
  margin-top: $g-1;
}
</style>
