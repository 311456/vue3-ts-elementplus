<template>
  <div class="hx-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :prop="item.field"
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
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    :value="sItem.value"
                    v-for="sItem in item.options"
                    :key="sItem.value"
                    >{{ sItem.name }}</el-option
                  >
                </el-select>
              </template>
              <!-- 时间选择框 -->
              <template v-else-if="item.type === 'date'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
import { defineComponent, PropType } from 'vue'

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
    // 以下方法在点击编辑后，page-modal新的formData值没有传递到HX-form中。HX-form中只会绑定第一个传入的值
    // 此时的formData是一个解构出来的新的对象(浅拷贝)，而且通过ref使其成为了一个响应式的数据
    // v-model="formData[`${item.field}`]"
    // const formData = ref({ ...props.modelValue })
    // watch(
    // 监听formData的变化，然后将事件以及新的值发射到外部绑定的组件中
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )

    // 以上方法在pageSearch、HxForm、单个数据 之间的数据传递都使用的双向绑定，这使得处理起来会很麻烦
    // 另外一种处理重置的思路：不使用v-model。使用原生的值绑定和事件绑定
    // :model-value ="modelValue[`${item.field}`]"
    // @update:modelValue="handleValueChange($event,item.field)"

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    // pageSearch处理事件发射：const handleResetClick = ()=>{formData.value = searchFormData}

    return {
      handleValueChange
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
