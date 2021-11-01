<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    // :formData="formData"使用该方式绑定hx-form表单的数据，但是该方式违背了单向数据流的原则
    // const formData = reactive({
    //   id: '',
    //   name: '',
    //   password: ''
    // })

    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
