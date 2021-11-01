type formItemType = 'input' | 'password' | 'select' | 'date'

export interface IformItem {
  field: string
  type: formItemType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
}

// hx-form可以接收的参数
export interface Iform {
  formItems: IformItem[]
  labelWidth?: string
  // 以下选项其实是对象类型，可以后期自己将类型规范一下
  itemStyle?: any
  colLayout?: any
}
