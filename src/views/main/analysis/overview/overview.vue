<template>
  <div class="overview">
    <!-- 使用图标时必须要进行组件注册，全局注册或者局部注册都可以 -->
    <el-icon class="is-loading" :size="30" color="blue">
      <loading />
    </el-icon>
    <el-icon :size="30">
      <edit />
    </el-icon>
    <delete style="width: 1em; height: 1em; margin-right: 8px" />
    <el-icon><check /></el-icon>
    <!-- svg图标源码 -->
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      data-v-394d1fd8=""
    >
      <path
        fill="currentColor"
        d="M512 832a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"
      ></path>
      <path
        fill="currentColor"
        d="m292.288 824.576 55.424 32-48 83.136a32 32 0 1 1-55.424-32l48-83.136zm439.424 0-55.424 32 48 83.136a32 32 0 1 0 55.424-32l-48-83.136zM512 512h160a32 32 0 1 1 0 64H480a32 32 0 0 1-32-32V320a32 32 0 0 1 64 0v192zM90.496 312.256A160 160 0 0 1 312.32 90.496l-46.848 46.848a96 96 0 0 0-128 128L90.56 312.256zm835.264 0A160 160 0 0 0 704 90.496l46.848 46.848a96 96 0 0 1 128 128l46.912 46.912z"
      ></path>
    </svg> -->
    <div
      ref="divRef"
      :style="{ width: '850px', height: '500px', margin: '30px' }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

// 因为echarts在导出时没有默认将整个对象导出，而是使用 export {}的方式，所以要导入整个对象需要使用export *
import * as echarts from 'echarts'

export default defineComponent({
  name: 'overview',
  setup() {
    const divRef = ref<HTMLElement>()
    // 在setup中，获取ref实例时，该实列还没有绑定到ref中，所以使用生命周期钩子
    onMounted(() => {
      // 第二个参数：可传theme：light、dark
      // 第三个参数：可传{renderer:'canvas'}或者{renderer:'svg'}
      // 1.初始化一个echarts实例
      const echartInstance = echarts.init(divRef.value!)
      // 2.编写配置文件
      const option = {
        // 图表名称。也可以设置二级标题，详细可查官方文档
        title: {
          text: 'Stacked Area Chart'
        },
        // 某种情况是否显示特殊效果
        tooltip: {
          // 坐标轴触发
          trigger: 'axis',
          // 坐标线
          axisPointer: {
            // cross、line、shadow
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // 图例，及每种图形对应的数据。不写也可以，根据后面series的name来决定
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        // 工具栏：下载图片，转换数据等
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // x轴
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        // 一般不设置，可根据数据自动设置
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            // 数据的类型：bar、line、pie。。。
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      // 3.设置配置，并且开始绘制
      echartInstance.setOption(option)
    })

    return {
      divRef
    }
  }
})
</script>

<style scoped lang="less">
.overview {
  width: 100%;
}
</style>
