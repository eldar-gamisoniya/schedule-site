import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from 'components/Hello'
import World from 'components/World'
import MainPage from 'components/MainPage'
import SearchList from 'components/SearchList'
import SchedulePage from 'components/SchedulePage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: MainPage },
    { path: '/hello', component: Hello },
    { path: '/world', component: World },
    { path: '/search', component: SearchList },
    { name: 'schedule', path: '/schedule/:id', component: SchedulePage }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
