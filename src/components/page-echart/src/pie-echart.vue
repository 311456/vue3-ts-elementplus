<template>
  <div class="pie-echart">
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
      top: '3%',
      left: 'center'
    },
    series: [
      {
        name: '商品数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped></style>
