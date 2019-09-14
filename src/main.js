import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 配置校验插件VeeValidate 并导入汉化校验包
import VeeValidate, { Validator } from 'vee-validate'
// 引入时间过滤器
import { fmtDate } from '@/utils/dayjs'
// 导入 VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 配置UI组件库vant及样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入判断是否登录
import CheckLogin from '@/utils/CheckLogin'

import '../src/style/nav-bar.css'

// 获取相对时间的过滤器
Vue.filter('fmtDate', fmtDate)

// 使用vant
Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框中触发验证的事件，默认是input
  // 如果为空的话，文本框输入过程中不验证，需要调用validate方法验证
  events: ''
})
// 注册全局组件CheckLogin
Vue.use(CheckLogin)

Validator.localize('zhCN', zhCN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
