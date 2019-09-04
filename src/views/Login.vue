<template>
  <div class="login">
    <!-- navbar导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 用户名密码输入框 -->
    <van-cell-group>
      <van-field
        class="inputBtn"
        v-model="user.mobile"
        placeholder="请输入手机号"
        left-icon="phone"
        clearable
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
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
        // 2. 登录成功存储登录状态(vuex 状态共享 + 本地 永久存储)
        // 此时的data就是数据返回的data(携带token的数据)
        const data = await Login(this.user)

        // 提交mutation 并将token保存到vuex
        // 参数一为注册的mutation事件，参数二为要提交的载荷

        // this.$store.commit('changeToken', data)

        // 简化mutation提交，采用mapMutation
        this.changeToken(data)

        // 登录成功跳转到首页并提示登录状态
        // this.$router.push('/')
        this.$toast.success('登录成功')
        console.log(data)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/nav-bar";
.login {
  .inputBtn {
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
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
