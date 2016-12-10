import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App'
import store from './store'
import router from './router'

import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.use(VueMaterial)

Vue.material.theme.register('default', {
  primary: 'cyan',
  accent: 'pink'
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
