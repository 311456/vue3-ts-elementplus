import { Iform } from '@/base-ui/form/types'

export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称~'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限',
      placeholder: '请输入权限名称~'
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
