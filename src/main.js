import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import { sync } from 'vuex-router-sync'
sync(store, router)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
