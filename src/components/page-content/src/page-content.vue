<template>
  <div class="page-content">
    <hx-table :listData="userList" v-bind="contentTableConfig">
      <!-- 1.头部信息插槽 -->
      <template #headerHandler>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="medium"
          >添加用户</el-button
        >
        <el-button icon="el-icon-delete" size="medium" type="primary"
          >删除</el-button
        >
      </template>
      <!-- 2.列表数据插槽 -->
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template v-slot:createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          circle
          plain
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          plain
        ></el-button>
        <!-- <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          > -->
      </template>
      <!-- 3.底部信息插槽 -->
    </hx-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'
import HxTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HxTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.systemModule.userList)
    // 用于分页
    // const userCount = computed(() => store.state.systemModule.userCount)
    return {
      userList
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px 40px;
  border-top: 20px solid #c7cadb;
}
</style>
