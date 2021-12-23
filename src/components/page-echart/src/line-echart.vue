<template>
  <div class="line-echart">
    <hx-echart :option="option"></hx-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

import HxEchart from '@/base-ui/echart/index'

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#6a7985'
        }
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
        type: 'line',
        symbol: 'triangle',
        symbolSize: 15,
        lineStyle: {
          color: '#5470C6',
          width: 4
        },
        itemStyle: {
          borderWidth: 3,
          borderColor: '#EE6666',
          color: 'yellow'
        }
      }
    ]
  }
})
</script>

<style scoped></style>
