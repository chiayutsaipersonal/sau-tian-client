import axios from 'axios'
import FileSaver from 'file-saver'
import moment from 'moment-timezone'
import Vue from 'vue'
import Vuex from 'vuex'
import Promise from 'bluebird'

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
  actions: {
    reloadPosData: context => {
      context.commit('setStartDate', null)
      context.commit('setEndDate', null)
      context.commit('viewWideRecords')
      context.commit('startLoading')
      return axios({
        method: 'get',
        url: '/sauTian/api/reloadPosData',
      }).then(() => {
        context.commit('endLoading')
        return Promise.resolve()
      }).catch(error => {
        context.commit('endLoading')
        return Promise.reject(error)
      })
    },
    generateReport: context => {
      context.commit('startLoading')
      return axios({
        method: 'get',
        url: `/sauTian/api/generateReport?startDate=${context.state.startDate}&endDate=${context.state.endDate}`,
        responseType: 'arraybuffer',
      }).then(serverResponse => {
        context.commit('endLoading')
        let file = new Blob([serverResponse.data], { type: 'application/zip' })
        FileSaver.saveAs(file, 'reports.zip')
        return Promise.resolve()
        // return context.dispatch('fetchReport', 'reports.zip')
      }).catch(error => {
        context.commit('endLoading')
        return Promise.reject(error)
      })
    },
    // fetchReport: (context, reportName) => {
    //   return axios({
    //     method: 'get',
    //     url: `/sauTian/reports/${reportName}`,
    //     responseType: 'arraybuffer',
    //   }).then(serverResponse => {
    //     let file = new Blob([serverResponse.data], { type: 'application/zip' })
    //     FileSaver.saveAs(file, reportName)
    //     return Promise.resolve()
    //   }).catch(error => Promise.reject(error))
    // },
  },
  mutations: {
    setStartDate: (state, startDate) => { state.startDate = startDate || null },
    setEndDate: (state, endDate) => { state.endDate = endDate || null },
    startLoading: state => { state.loading = true },
    endLoading: state => { state.loading = false },
    viewNarrowRecords: state => { state.narrowRecords = true },
    viewWideRecords: state => { state.narrowRecords = false },
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
    loading: false,
    narrowRecords: false,
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
