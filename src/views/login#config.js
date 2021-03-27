import { MAIL_REGEX } from '../constants/regex'

export const decorators = vm => ({
  mail: [
    'mail',
    {
      rules: [
        { required: true, message: '请输入正确邮箱地址', pattern: MAIL_REGEX }
      ]
    }
  ],
  password: [
    'password',
    {
      rules: [{ required: true, message: '请输入密码' }]
    }
  ]
})
