import moment from 'moment-timezone'
import Vue from 'vue'
import Vuex from 'vuex'

import clients from './clients'
import invoices from './invoices'
import products from './products'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    clients,
    invoices,
    products,
  },
  actions: {},
  mutations: {
    setStartDate: (state, startDate) => { state.startDate = startDate || null },
    setEndDate: (state, endDate) => { state.endDate = endDate || null },
  },
  getters: {
    invoiceQueryPeriod: state => {
      let startMoment = createMoment(state.startDate)
      let endMoment = createMoment(state.endDate)
      return isValidDateRange(startMoment, endMoment)
        ? endMoment.diff(startMoment, 'days') + 1
        : null
    },
    isValidDateRange: state => {
      let startMoment = createMoment(state.startDate)
      let endDate = createMoment(state.endDate)
      return isValidDateRange(startMoment, endDate)
    },
  },
  state: {
    startDate: null,
    endDate: null,
  },
})

export default store

function isValidDateRange (startMoment, endMoment) {
  return (
    (startMoment !== null) &&
    (endMoment !== null) &&
    (endMoment.isSameOrAfter(startMoment))
  )
}

function createMoment (stringDate) {
  return stringDate ? moment(new Date(stringDate)) : null
}

if (module.hot) {
  module.hot.accept([
    './clients',
    './invoices',
    './products',
    // './actions',
    // './getters',
    // './mutations',
  ], () => {
    let newClientModule = require('./clients').default
    let newInvoiceModule = require('./invoices').default
    let newProductModule = require('./products').default
    // let newActions = require('./actions').default
    // let newGetters = require('./getters').default
    // let newMutations = require('./mutations').default
    store.hotUpdate({
      modules: {
        clients: newClientModule,
        invoices: newInvoiceModule,
        products: newProductModule,
      },
      // actions: newActions,
      // getters: newGetters,
      // mutations: newMutations,
    })
  })
}
