import { Iform } from '@/base-ui/form/types'

export const pageModalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名',
      rules: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',

      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  itemStyle: { padding: '0 auto' },
  colLayout: { span: 24 }
}
