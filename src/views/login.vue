<template>
  <div class="layout-login">
    <header>
      <img src="http://placehold.it/100X28/1890ff/fff?text=logo" alt="logo" />
    </header>
    <main class="login-box">
      <div class="login-left">
        <img src="http://placehold.it/420X480/1890ff/fff?text=welcome" alt />
      </div>
      <div class="login-right">
        <h3>游戏账号系统</h3>
        <a-form :form="form" @submit.prevent="onSubmit">
          <a-form-item>
            <a-input
              v-decorator="decorators.mail"
              placeholder="请输入账号"
              size="large"
            >
              <a-icon
                slot="prefix"
                type="mail"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="decorators.password"
              size="large"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-form-button"
        >
          立即登录
        </a-button>
      </a-form-item>
        </a-form>
      </div>
    </main>
  </div>
</template>

<script>
import { decorators } from './login#config'
import { getUsers } from '../api/user.js'
import { setAuthToken } from '../constants/cookie'
export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    decorators
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) return
        let auth = {}
        return getUsers().then(res => {
          const users = res.data
          // 判断输入账号是否存在
          const flag = users.some(user => {
            if (user.emailAddress === values.mail) {
              auth = user
              return true
            }
          })
          if (flag) {
            // 判断账号密码准确
            if (auth.password === values.password) {
              setAuthToken(auth.userAccountId + '&' + auth.emailAddress + '&' + (auth.isAdmin ? 1 : 0))
              this.$router.push({
                name: 'relation'
              })
            } else {
              this.$message.error('密码不正确')
            }
          } else {
            this.$message.error('您的账号不存在')
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.layout-login {
  height: 100vh;
  position: relative;
  min-height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(https://static-s.styd.cn/201809141133/oa_login_bg.png) left
    center;
  background-size: cover;
  .login-box {
    width: 960px;
    height: 480px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 12px 0px rgba(24, 144, 255, 0.2);
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    .login-left {
      background: linear-gradient(
        225deg,
        rgba(70, 210, 250, 1) 0%,
        rgba(24, 144, 255, 1) 100%
      );
      width: 420px;
      height: 480px;
      img {
        width: 100%;
      }
    }
    .login-right {
      width: 540px;
      height: 480px;
      text-align: center;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      padding: 60px 106px 0;
      h3 {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        color: rgba(24, 144, 255, 1);
        line-height: 38px;
        margin-bottom: 24px;
      }
    }
  }
  header {
    position: absolute;
    top: 30px;
    left: 40px;
  }
}
@media (max-width: 600px) {
  .login {
    .login-box {
      width: 100%;
      height: 60%;
      .login-left {
        display: none;
      }
      .login-right {
        width: 100%;
        padding: 10% 6% 0;
      }
    }
  }
}
</style>
