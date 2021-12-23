<template>
  <div class="goods">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #oldPrice="scope"> {{ '￥' + scope.row.oldPrice }} </template>
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '上架' : '下架' }}</el-button
        >
      </template>
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
