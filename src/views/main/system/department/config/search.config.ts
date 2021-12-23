import { Iform } from '@/base-ui/form/types'

export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称~'
    },
    {
      field: 'leader',
      type: 'input',
      label: '负责人',
      placeholder: '请输入部门负责人姓名~'
    },
    {
      field: 'createAt',
      type: 'date',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  // label文字显示的宽度
  labelWidth: '90px',
  // item的特定样式
  itemStyle: { padding: '10px 40px' },
  // 屏幕缩放的显示样式
  colLayout: {
    xl: 6, //>=1920px显示24/6=4个
    lg: 8, //>=1200px --> 3
    md: 12, //>=992px --> 2
    sm: 24, //>=768px --> 1
    xs: 24 //<768px --> 1
  }
}
