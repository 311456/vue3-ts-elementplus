<template>
  <div class="hx-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Card Title'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.box-card {
  &:deep(.el-card__hearder) {
    padding: 10px 20px !important;
  }
  // background-color: #f0f8ff !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
}

.item {
  margin-bottom: 10px;
}
</style>
