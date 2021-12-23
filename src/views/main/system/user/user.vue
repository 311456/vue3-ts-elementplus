<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newClick="handleNewData"
      @editClick="handleEditData"
    >
      <template #enable="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :pageModalConfig="pageModalConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'
import { pageModal } from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { pageModalConfig } from './config/pageModal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    // :formData="formData"使用该方式绑定hx-form表单的数据，但是该方式违背了单向数据流的原则
    // const formData = reactive({
    //   id: '',
    //   name: '',
    //   password: ''
    // })

    // pagemodal的处理逻辑
    // 1.是否隐藏密码行
    // 写的时候，会出现以下问题：对isHidden第一次修改后，该值虽然在组件中被改变，但是页面还是第一次修改的值的效果。
    // 原因：因为在第一次修改后，isHidden的值被确定，页面进行渲染，当下一次修改时，上一个的组件并没有被销毁，页面还是使用的之前的那个dialog组件。所以造成了值被修改，但页面并没有变化的效果。
    // 解决方法：给dialog设置destroy-on-close属性，在关闭时将该组件销毁，下一次重新渲染。
    const newCallback = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = pageModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    // 因为vuex里请求数据是异步的，所以可能第一次进入该页面时，数据还没有请求到，所以我们需要将其设置为一个可响应式数据，在其发生改变时重新渲染。
    const pageModalConfigRef = computed(() => {
      const departmentItem = pageModalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { name: item.name, value: item.id }
      })

      const roleItem = pageModalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { name: item.name, value: item.id }
      })
      return pageModalConfig
    })

    // 调用hook获取公共的函数
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageModalConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
