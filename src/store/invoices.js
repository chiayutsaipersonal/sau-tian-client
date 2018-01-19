import axios from 'axios'

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
      }).then(result => {
        context.commit('register', result.data)
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
      }).then(() => {
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
  },
  mutations: {
    clearData: state => {
      state.data = []
    },
    register: (state, payload) => {
      state.data = payload.data
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
      state.preservedDataEntries = []
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
    preservedDataEntries: [],
  },
}

export default invoices
