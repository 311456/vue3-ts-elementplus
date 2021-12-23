import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }

  const updateSize = () => {
    // 适应屏幕大小，自动调整图表
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 导出为对象类型，在使用时可以只取出其中一个。
  // 如果导出的为元组类型，即【】类型，则必须一一对应导出。
  return {
    echartInstance,
    setOption,
    updateSize
  }
}
