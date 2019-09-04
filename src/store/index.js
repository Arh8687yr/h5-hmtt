import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token对象
    token: null
  },
  mutations: {
    // 提交mutation是更改状态的唯一方法
    // mutation更像是注册事件 第一个参数是状态 第二个参数是载荷(可以使对象)
    changeToken (state, token) {
      state.token = token
    }
  },
  actions: {

  }
})
