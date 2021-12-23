import { Iform } from '@/base-ui/form/types'

export const pageModalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  itemStyle: { padding: '0 auto' },
  colLayout: { span: 24 }
}
