<template>
  <!--2021-10-23 + coderwhy@1.1.4 -->
  <div class="dashboard">
    <el-row :gutter="20">
      <template v-for="item in amountListData" :key="item.title">
        <el-col :span="6"
          ><hx-card :title="item.title"
            ><h2 class="goodsTitle">{{ item.value }}</h2></hx-card
          ></el-col
        >
      </template>
    </el-row>
    <el-row :gutter="14" class="content-row">
      <el-col :span="7"
        ><hx-card title="每个分类商品的种类">
          <pie-echart :data="categoryCountData"></pie-echart></hx-card
      ></el-col>
      <el-col :span="10"
        ><hx-card title="商品销售量分布图">
          <map-echart :data="addressGoodsSaleMap"></map-echart></hx-card
      ></el-col>
      <el-col :span="7"
        ><hx-card title="商品收藏统计"
          ><rose-echart :data="categoryFavorData"></rose-echart> </hx-card
      ></el-col>
    </el-row>
    <el-row :gutter="14" class="content-row">
      <el-col :span="12"
        ><hx-card title="每个分类商品的销量"
          ><bar-echart v-bind="categorySaleData"></bar-echart> </hx-card
      ></el-col>
      <el-col :span="12"
        ><hx-card title="不同城市的销量数据"
          ><line-echart v-bind="addressSaleData"></line-echart> </hx-card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HxCard from '@/base-ui/card/index'
import {
  pieEchart,
  roseEchart,
  barEchart,
  lineEchart,
  mapEchart
} from '@/components/page-echart/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    HxCard,
    pieEchart,
    roseEchart,
    barEchart,
    lineEchart,
    mapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('analysisModule/getAnalysisDataAction')

    const categoryCountData = computed(() => {
      return store.state.analysisModule.categoryGoodsCount.map((item: any) => {
        return { value: item.goodsCount, name: item.name }
      })
    })
    const categoryFavorData = computed(() => {
      return store.state.analysisModule.categoryGoodsFavor.map((item: any) => {
        return { value: item.goodsFavor, name: item.name }
      })
    })
    const categorySaleData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.analysisModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const addressSaleData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const addressGoodsSale = store.state.analysisModule.addressGoodsSale
      for (const item of addressGoodsSale) {
        xLabels.push(item.address)
        values.push(item.count)
      }
      return { xLabels, values }
    })
    const addressGoodsSaleMap = computed(() => {
      return store.state.analysisModule.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })
    const amountListData = computed(() => {
      return store.state.analysisModule.amountGoodsList.map((item) => {
        return { title: item.title, value: item.number1 }
      })
    })
    return {
      categoryCountData,
      categoryFavorData,
      categorySaleData,
      addressSaleData,
      addressGoodsSaleMap,
      amountListData
    }
  }
})
</script>

<style scoped>
.dashboard {
  padding-top: 20px;
  padding: 20px 20px;
}
.content-row {
  margin-top: 20px;
}
.goodsTitle {
  margin: -8px 0;
}
</style>
