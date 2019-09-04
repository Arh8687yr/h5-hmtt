import Vue from 'vue'
import Vuex from 'vuex'
// 将本地存储的数据作为对象导入
import * as localTools from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token对象
    // 从本地存储取出token对象并传给状态
    token: localTools.getItem('userinfo')
  },
  mutations: {
    // 提交mutation是更改状态的唯一方法
    // mutation更像是注册事件 第一个参数是状态 第二个参数是载荷(可以使对象)
    changeToken (state, token) {
      state.token = token
      // 将修改后的状态存放在本地
      localTools.setItem('userinfo', token)
    }
  },
  actions: {

  }
})
