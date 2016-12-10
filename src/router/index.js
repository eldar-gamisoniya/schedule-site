import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '../components/Hello'
import World from '../components/World'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/hello' },
    { path: '/hello', component: Hello },
    { path: '/world', component: World }
  ]
})
