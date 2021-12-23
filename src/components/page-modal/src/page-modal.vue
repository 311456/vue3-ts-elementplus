<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新增"
      width="30%"
      destroy-on-close
      center
    >
      <hx-form
        class="form"
        v-bind="pageModalConfig"
        v-model="formData"
      ></hx-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, h } from 'vue'
import { ElNotification } from 'element-plus'

import HxForm from '@/base-ui/form'

import { useStore } from 'vuex'

export default defineComponent({
  components: {
    HxForm
  },
  props: {
    pageModalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.pageModalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store
          .dispatch('systemModule/editPageDataAction', {
            pageName: props.pageName,
            editDatas: { ...formData.value, ...props.otherInfo },
            id: props.defaultInfo.id
          })
          .then((result) => {
            ElNotification({
              type: 'info',
              title: '温馨提示',
              message: h('h3', { style: 'color: black' }, `${result}`),
              position: 'top-left'
            })
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
      } else {
        // 新增
        store
          .dispatch('systemModule/createPageDataAction', {
            pageName: props.pageName,
            newData: { ...formData.value, ...props.otherInfo }
          })
          .then((result) => {
            ElNotification({
              type: 'info',
              title: '温馨提示',
              message: h('h3', { style: 'color: black' }, `${result}`),
              position: 'top-left'
            })
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
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less">
.form {
  margin: -20px auto;
}
</style>
