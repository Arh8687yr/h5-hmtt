<template>
  <div class="login">
    <!-- navbar导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 用户名密码输入框 -->
    <van-cell-group>
      <van-field
        v-validate="{ required: true, regex: /^1([38]\d|4[5-9]|5[0-35-9]|6[56]|7[0-8]|9[189])\d{8}$/ }"
        name="mobile"
        class="inputBtn"
        v-model="user.mobile"
        :error-message="errors.first('mobile')"
        placeholder="请输入手机号"
        left-icon="phone"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        class="inputBtn"
        v-model="user.code"
        type="password"
        placeholder="请输入验证码"
        left-icon="lock"
      >
        <van-button slot="button" size="small" class="codeBtn">发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="loginBox">
      <van-button type="info" class="loginBtn" @click="submit">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['changeToken']),

    //  1. 登录
    async submit () {
      try {
        // 先去判断validate校验是否成功 如果成功 发送请求验证 如果不成功 则返回
        const valid = await this.$validator.validate()
        // console.log(valid)
        if (!valid) {
          return
        }
        // 2. 登录成功存储登录状态(vuex 状态共享 + 本地 永久存储)
        const data = await Login(this.user)

        // 提交mutation 并将token保存到vuex
        this.changeToken(data)

        // 登录成功跳转到首页并提示登录状态
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入您的手机号码',
          regex: '您输入的手机号码格式不正确！'
        },
        code: {
          required: '请输入您的验证码',
          digits: '您输入的验证码格式不正确！'
        }
      }
    }
    this.$validator.localize('custom', dict)
  }
}
</script>

<style lang="less" scoped>
@import "../style/nav-bar";
.login {
  .inputBtn {
    padding: 10px 16px;
    color: rgb(138, 138, 138);
    .codeBtn {
      border-radius: 16px;
      background-color: rgb(237, 237, 237);
    }
  }
  .loginBox {
    width: 100%;
    height: 50px;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .loginBtn {
      width: 92%;
      border-radius: 5px;
    }
  }
}
</style>
