import Vue from 'vue'
import Vuex from 'vuex'

/* modules */
import clients from './clients'
import products from './products'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    clients,
    products,
  },
  actions: {},
  getters: {},
  mutations: {},
  state: {},
})

export default store

if (module.hot) {
  module.hot.accept([
    './products',
    './clients',
    // './actions',
    // './getters',
    // './mutations',
  ], () => {
    let newProductModule = require('./products').default
    let newClientModule = require('./clients').default
    // let newActions = require('./actions').default
    // let newGetters = require('./getters').default
    // let newMutations = require('./mutations').default
    store.hotUpdate({
      modules: {
        products: newProductModule,
        clients: newClientModule,
      },
      // actions: newActions,
      // getters: newGetters,
      // mutations: newMutations,
    })
  })
}
