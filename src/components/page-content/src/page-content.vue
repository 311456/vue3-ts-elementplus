<template>
  <div class="page-content">
    <hx-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.头部信息插槽 -->
      <template #headerHandler>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="medium"
          v-if="isCreate"
          @click="handleNewClick"
          >添加</el-button
        >
        <el-button
          icon="el-icon-delete"
          size="medium"
          type="primary"
          v-if="isDelete"
          >删除</el-button
        >
      </template>
      <!-- 2.列表数据插槽 -->
      <template v-slot:createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          circle
          plain
          v-if="isUpdate"
          @click="handleEditClick(scope.row)"
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          plain
          v-if="isDelete"
          @click="handleDeleteClick(scope.row)"
        ></el-button>
        <!-- <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          > -->
      </template>
      <!-- 3.动态插槽，每个展示的列表的独特插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 如果有传入slotName，那么就渲染该插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hx-table>
    <el-dialog v-model="centerDialogVisible" title="警告" width="25%">
      <span>您确定删除该条数据吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDeleteConfirmClick"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, toRaw, h } from 'vue'
import { ElNotification } from 'element-plus'

import { useStore } from '@/store'
import HxTable from '@/base-ui/table'

import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  components: {
    HxTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newClick', 'editClick'],
  // setup类似于created，只会调用一次
  setup(props, { emit }) {
    const store = useStore()

    // 获取按钮的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.分页后重新请求数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset:
            pageInfo.value.currentPage * pageInfo.value.pageSize -
            pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.从vuex中获取数据
    const dataList = computed(() =>
      // 返回值是一个函数，而且需要传入参数
      store.getters[`systemModule/pageListData`](props.pageName)
    )
    // 用于分页
    const dataCount = computed(() =>
      store.getters[`systemModule/pageListCount`](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherPropsSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )
    // 5.删除数据：发射事件到store--》store发射删除的网络请求
    // 控制 删除 的弹出框
    const centerDialogVisible = ref(false)
    // 存储 删除的那一条数据
    const deleteData = ref({ id: 0 })
    const handleDeleteClick = (item: any) => {
      centerDialogVisible.value = true
      deleteData.value = item
    }
    const handleDeleteConfirmClick = () => {
      centerDialogVisible.value = false
      // 因为取到的数据是一个proxy对象，所以需要使用toRaw进行转换。也可以通过json序列化进行转换
      const deleteList = toRaw(deleteData.value)
      store
        .dispatch('systemModule/deleteDataAction', {
          pageName: props.pageName,
          id: deleteList.id
        })
        .catch((err) => {
          ElNotification({
            type: 'warning',
            title: '出错啦',
            message: h(
              'h3',
              { style: 'color: red' },
              `操作失败，请重试!错误信息：${err}`
            ),
            position: 'top-left'
          })
        })
    }
    const handleNewClick = () => {
      emit('newClick')
    }
    const handleEditClick = (item: any) => {
      emit('editClick', item)
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleDeleteConfirmClick,
      handleNewClick,
      handleEditClick,
      centerDialogVisible
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
