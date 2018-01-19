import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultNoticeQueue: false,
})
Vue.use(Vuex)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
