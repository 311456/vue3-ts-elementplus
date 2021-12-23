<template>
  <div class="bar-echart">
    <hx-echart :option="option"></hx-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

import HxEchart from '@/base-ui/echart'

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
// 每个分类商品的种类
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'bar'
      }
    ]
  }
})
</script>

<style scoped></style>
