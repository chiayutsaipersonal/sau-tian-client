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
    delete: context => {
      context.commit('clearData')
      let url = `/sauTian/api/invoices?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`
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
    update: (state, dataForUpdate) => {
      let index = state.data.findIndex(entry => {
        return entry.customSalesDataId === dataForUpdate.id
      })
      state.data[index]._clientId = dataForUpdate._clientId
      state.data[index]._employeeId = dataForUpdate._employeeId
      state.data[index]._preserved = dataForUpdate._preserved
      state.data[index]._quantity = dataForUpdate._quantity
      state.data[index]._unitPrice = dataForUpdate._unitPrice
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
