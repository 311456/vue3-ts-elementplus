import { Iform } from '@/base-ui/form/types'

export const pageModalConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
      // 验证规则有问题，必传验证可以，但是填写了值之后却验证不了
      // * 推测是因为使用的是表单的原生值绑定，element plus 内部验证不了
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入您的姓名',
      //     trigger: 'blur'
      //   }
      // ]
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
