<template>
  <div class="hx-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColum"
        type="selection"
        min-width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColum"
        type="index"
        align="center"
        width="60"
        label="序号"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 具名插槽 + 作用域插槽：渲染数组元素 -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          :default-current-page="1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 表格名称
    title: {
      type: String
    },
    // 表头列表
    propList: {
      type: Array,
      required: true
    },
    // 数据列表
    listData: {
      type: Array,
      required: true
    },
    // 数据总数
    listCount: {
      type: Number,
      default: 0
    },
    // 是否展示序号
    showIndexColum: {
      type: Boolean,
      default: false
    },
    // 是否展示选择框
    showSelectColum: {
      type: Boolean,
      default: false
    },
    // 分页
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 0 })
    },
    // 表格是否可展开
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 是否展示分页器
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
      // 打印的是选中的数据，后期可以根据选中的数据进行批量删除或者导出
      // console.log(value)
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 50px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
    margin-right: -5px;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
