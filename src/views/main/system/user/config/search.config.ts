import { Iform } from '@/base-ui/form/types'

export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    // {
    //   field: 'password',
    //   type: 'password',
    //   label: '密码',
    //   placeholder: '请输入密码'
    // },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          name: '启用',
          value: 1
        },
        {
          name: '禁用',
          value: 0
        }
      ]
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
