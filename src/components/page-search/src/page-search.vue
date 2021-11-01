<template>
  <div class="page-search">
    <hx-form v-bind="searchFormConfig" v-model="formData">
      <!-- <template #header>
          <h3>搜索</h3>
        </template> -->
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary" icon="el-icon-s-promotion" size="medium"
            >清空</el-button
          >
          <el-button type="primary" icon="el-icon-search" size="medium"
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
  setup() {
    const formData = ref({
      id: '',
      password: '',
      fruit: '',
      createTime: '',
      name: ''
    })
    return {
      formData
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
