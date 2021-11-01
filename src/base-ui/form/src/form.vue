<template>
  <div class="hx-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 输入框以及密码框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    :value="sItem.value"
                    v-for="sItem in item.options"
                    :key="sItem.name"
                    >{{ sItem.value }}</el-option
                  >
                </el-select>
              </template>
              <!-- 时间选择框 -->
              <template v-else-if="item.type === 'date'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IformItem } from '@/base-ui/form/index'

export default defineComponent({
  props: {
    // field是后期添加的唯一标识
    // v-model = "formData[`${item.field}`]"
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      // es6语法
      type: Array as PropType<IformItem[]>,
      // 当有默认类型时是对象或者数组时需要写成箭头函数得形式
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '90px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //>=1920px显示24/6=4个
        lg: 8, //>=1200px --> 3
        md: 12, //>=992px --> 2
        sm: 24, //>=768px --> 1
        xs: 24 //<768px --> 1
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 此时的formData是一个解构出来的新的对象，而且通过ref使其成为了一个响应式的数据
    const formData = ref({ ...props.modelValue })
    watch(
      // 监听formData的变化，然后将事件以及新的值发射到外部绑定的组件中
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.hx-form {
  padding-top: 22px;

  // .form-item {}  该写法的样式是写死了的，一般不建议采用该方式
}
</style>
