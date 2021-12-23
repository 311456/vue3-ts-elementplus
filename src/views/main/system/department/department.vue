<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      ref="pageContentRef"
      @newClick="handleNewData"
      @editClick="handleEditData"
    >
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="department"
      :pageModalConfig="pageModalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'
import { pageModal } from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { pageModalConfig } from './config/pageModal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'department',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      pageModalConfig
    }
  }
})
</script>

<style scoped></style>
