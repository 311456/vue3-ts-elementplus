export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '路由', minWidth: '170' },
    { prop: 'permission', label: '按钮权限', minWidth: '130' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '150',
      slotName: 'handle'
    }
  ],
  showIndexColum: false,
  showSelectColum: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
