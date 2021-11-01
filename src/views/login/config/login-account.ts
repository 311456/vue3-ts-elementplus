export const rules = {
  name: [
    {
      required: true,
      message: '必须输入账号!',
      // triggler:'change'
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号必须是5-10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须输入密码！',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须是5个以上个字母或者数字~',
      trigger: 'blur'
    }
  ]
}
