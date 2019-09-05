import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tabbar,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/ask',
          name: 'ask',
          component: () => import('@/views/Home/Ask.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/Home/Video.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/Home/User.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
    }
  ]
})
