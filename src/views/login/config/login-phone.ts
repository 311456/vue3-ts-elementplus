export const rules = {
  number: [
    {
      required: true,
      message: '必须输入手机号!',
      // triggler:'change'
      trigger: 'blur'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '手机号输入错误！',
      trigger: 'blur'
    }
  ],
  vertifyCode: [
    {
      required: true,
      message: '必须输入验证码！',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{4,}$/,
      message: '验证码不正确！',
      trigger: 'blur'
    }
  ]
}
