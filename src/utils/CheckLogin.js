// 插件：就是一个对象，具有install(Vue,options)

export default {
  install (Vue) {
    // 给Vue的实例原型上增加方法
    Vue.prototype.$checkLogin = function () {
      // this是Vue的实例  Vue调用
    //   判断是否登录
      if (!this.$store.state.token) {
        // 没有登录,提示用户是否登录
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否跳转到登录页面'
        }).then(() => {
          // 点击了确定 跳转到登录页面
          this.$router.push('/login')
        }).catch(() => {
          // 点击了取消
        })
        return false
      }
      return true
    }
  }
}
