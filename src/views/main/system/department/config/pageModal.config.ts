import { Iform } from '@/base-ui/form/types'

export const pageModalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门负责人',
      placeholder: '请输入部门负责人'
    }
  ],
  itemStyle: { padding: '0 auto' },
  colLayout: { span: 24 }
}
