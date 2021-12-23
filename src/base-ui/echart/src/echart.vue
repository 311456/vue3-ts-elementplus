<template>
  <div class="echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'

import useEchart from '../hooks/useEchart'

// 设置props,泛型
const props = withDefaults(
  defineProps<{
    option: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '350px'
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOption } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    setOption(props.option)
  })
})
</script>

<style scoped></style>
