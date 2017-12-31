import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {},
  actions,
  getters,
  mutations,
  state,
})

export default store

if (module.hot) {
  module.hot.accept([
    './actions',
    './getters',
    './mutations',
  ], () => {
    let newActions = require('./actions').default
    let newGetters = require('./getters').default
    let newMutations = require('./mutations').default
    store.hotUpdate({
      actions: newActions,
      getters: newGetters,
      mutations: newMutations,
    })
  })
}
