import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 配置UI组件库vant及样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 配置校验插件VeeValidate
import VeeValidate from 'vee-validate'
// 使用vant
Vue.use(Vant)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
