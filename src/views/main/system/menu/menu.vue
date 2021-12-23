<template>
  <div class="menu">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      ref="pageContentRef"
    >
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'hx-menu',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
