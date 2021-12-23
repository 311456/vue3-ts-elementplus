<template>
  <div class="rose-echart">
    <hx-echart :option="option"></hx-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

import HxEchart from '@/base-ui/echart'

import { IDataType } from '../types'
const props = defineProps<{
  data: IDataType[]
}>()
// 每个分类商品的个数
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '收藏数量',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped></style>
