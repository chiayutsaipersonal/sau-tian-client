import axios from 'axios'
import uuidV4 from 'uuid/v4'

const invoices = {
  namespaced: true,
  actions: {
    fetch: (context, payload = {}) => {
      context.commit('clearData')
      let url = `/sauTian/api/invoices?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`
      if (payload.perPage && payload.currentPage) url += `&per_page=${payload.perPage}&page=${payload.currentPage}`
      if (payload.productId) url += `&productId=${payload.productId}`
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'get',
        url,
      }).then(serverResponse => {
        context.commit('register', serverResponse.data)
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('reset')
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
    upsert: (context, payload) => {
      let url = '/sauTian/api/invoices'
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'post',
        url,
        data: payload,
      }).then(serverResponse => {
        context.commit('update', serverResponse.data.data)
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
    delete: (context, productId = null) => {
      context.commit('clearData')
      let url = productId === null
        ? `/sauTian/api/invoices?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`
        : `/sauTian/api/invoices/products/${productId}?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'delete',
        url,
      }).then(() => {
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('reset')
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
  },
  mutations: {
    clearData: state => { state.data = [] },
    update: (state, payload) => {
      let index = state.data.findIndex(entry => {
        return entry.customSalesDataId === payload.id
      })
      let a = state.data[index]
      a._clientId = payload._clientId
      a._employeeId = payload._employeeId
      a._preserved = payload._preserved
      a._quantity = payload._quantity
      a._unitPrice = payload._unitPrice
      a.checkboxDisabled = (a.areaId !== null) && ((a.areaId >= 1) && (a.areaId <= 4))
        ? true
        : a._clientId === null
    },
    register: (state, payload) => {
      payload.data.forEach((entry, index) => {
        state.data.push(entry)
        state.data[index].index = index + 1
        if (!entry.customSalesDataId) {
          state.data[index].customSalesDataId = uuidV4().toLocaleUpperCase()
        }
        if (entry._preserved === null) {
          if ((entry.areaId !== null) && ((entry.areaId >= 1) && (entry.areaId <= 4))) {
            state.data[index]._preserved = true
          } else {
            state.data[index]._preserved = false
          }
        } else {
          state.data[index]._preserved = entry._preserved === 1
        }
        entry.checkboxDisabled = (entry.areaId !== null) && ((entry.areaId >= 1) && (entry.areaId <= 4))
          ? true
          : entry._clientId === null
      })
      if (payload.pagination) {
        state.totalRecords = payload.pagination.totalRecords
        state.perPage = payload.pagination.perPage
        state.totalPages = payload.pagination.totalPages
        state.currentPage = payload.pagination.currentPage
        state.first = payload.pagination.first || null
        state.prev = payload.pagination.prev || null
        state.self = payload.pagination.self || null
        state.next = payload.pagination.next || null
        state.last = payload.pagination.last || null
      } else {
        state.totalRecords = state.data.length
        state.perPage = state.data.length
        state.totalPages = 1
        state.currentPage = 1
        state.first = null
        state.prev = null
        state.self = null
        state.next = null
        state.last = null
      }
    },
    reset: state => {
      state.loading = false
      state.data = []
      state.totalRecords = 0
      state.perPage = 10
      state.totalPages = 0
      state.currentPage = 1
      state.first = null
      state.prev = null
      state.self = null
      state.next = null
      state.last = null
      state.productFilter = null
    },
    setLoadingState: (state, loadingState) => {
      state.loading = loadingState
    },
    setProductFilter: (state, filterProductId) => {
      state.productFilter = filterProductId
    },
  },
  getters: {
    isLoading: state => state.loading,
    isUpdating: state => state.updating,
    uniqueProducts: state => [...new Set(state.data.map(item => item.productId))],
    filteredData: state => {
      let workingData = state.data.filter(entry => state.productFilter === null ? true : entry.productId === state.productFilter)
      for (let counter = 0; counter < workingData.length; counter++) {
        let entry = workingData[counter]
        if (entry._preserved) {
          // calculate inv value from working attributes if existed
          let unitPrice = entry._unitPrice !== null ? entry._unitPrice : entry.unitPrice
          let quantity = entry._quantity !== null ? entry._quantity : entry.quantity
          workingData[counter].workingInvoiceValue = unitPrice * quantity
          // calculate actual inv value
          workingData[counter].actualInvoiceValue = entry.unitPrice * entry.quantity
        } else {
          workingData[counter].workingInvoiceValue = 0
          workingData[counter].actualInvoiceValue = entry.unitPrice * entry.quantity
        }
      }
      return workingData
    },
  },
  state: {
    loading: false,
    updating: false,
    data: [],
    totalRecords: 0,
    perPage: 10,
    totalPages: 0,
    currentPage: 1,
    first: null,
    prev: null,
    self: null,
    next: null,
    last: null,
    productFilter: null,
  },
}

export default invoices
