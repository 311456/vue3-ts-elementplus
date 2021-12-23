<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @newClick="handleNewData"
      @editClick="handleEditData"
    ></page-content>
    <page-modal
      :pageModalConfig="pageModalConfig"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      pageName="role"
      :defaultInfo="defaultInfo"
    >
      <div class="eltree">
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          show-checkbox
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
          @check="handleCheckClick"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'

import { pageSearch } from '@/components/page-search'
import { pageContent } from '@/components/page-content'
import { pageModal } from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { pageModalConfig } from './config/pageModal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { getMenuLeafKeys } from '@/utils/map-menu'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    // 1.处理角色权限的回显
    // 一般只绑定叶子节点
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCb = (item: any) => {
      // page-content的hooks
      // 因为权限树渲染出来后，来不及绑定对应的值，所以将回调推迟到下一次dom更新周期渲染
      const leafKeys = getMenuLeafKeys(item.menuList)
      console.log(leafKeys)

      nextTick(() => {
        console.log(elTreeRef.value)

        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // 调用公共的hooks
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCb)

    const store = useStore()
    const entireMenu = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    // 处理 分配的角色权限
    const handleCheckClick = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      // 要求传递过去的是一个对象（角色的权限）
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      pageModalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      entireMenu,
      otherInfo,
      handleCheckClick,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.eltree {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
