import axios from 'axios'

const invoices = {
  namespaced: true,
  actions: {
    fetch: (context, payload = {}) => {
      if (context.state.loading || context.state.updating) {
        return Promise.resolve()
      }
      context.commit('clearData')
      let url = `/sauTian/api/invoices?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`
      if (payload.perPage && payload.currentPage) url += `&per_page=${payload.perPage}&page=${payload.currentPage}`
      if (payload.productId) url += `&productId=${payload.productId}`
      context.commit('setLoadingState', true)
      return axios({
        method: 'get',
        url,
      }).then(result => {
        context.commit('register', result.data)
        context.commit('setLoadingState', false)
        return Promise.resolve()
      }).catch(error => {
        context.commit('reset')
        context.commit('setLoadingState', false)
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
    uniqueProducts: state => {
      return [...new Set(state.data.map(item => item.productId))]
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
