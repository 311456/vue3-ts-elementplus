<template>
  <div class="page-search">
    <hx-form v-bind="searchFormConfig" v-model="formData">
      <!-- <template #header>
          <h3>搜索</h3>
        </template> -->
      <template #footer>
        <div class="handle-btn">
          <el-button
            type="primary"
            icon="el-icon-s-promotion"
            size="medium"
            @click="handleResetClick"
            >清空</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            size="medium"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hx-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import HxForm from '@/base-ui/form/index'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HxForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该根据配置文件的field动态决定
    const formItems = props.searchFormConfig.formItems ?? []
    const searchFormData: any = {}
    for (const item of formItems) {
      // 将field作为key存入对象中，动态生成对应的属性
      searchFormData[item.field] = ''
    }
    const formData = ref(searchFormData)

    // 处理重置操作
    const handleResetClick = () => {
      for (const key in searchFormData) {
        formData.value[`${key}`] = searchFormData[key]
      }
      emit('resetBtnClick')
    }

    // 处理搜索按钮
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.handle-btn {
  text-align: right;
  padding: 0 40px 20px 0;
  margin-top: -10px;
}
</style>
