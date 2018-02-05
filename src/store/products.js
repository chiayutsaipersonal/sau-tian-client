import axios from 'axios'

const products = {
  namespaced: true,
  actions: {
    clear: (context, productId) => {
      let url = `/sauTian/api/products/${productId}`
      context.commit('startLoading', null, { root: true })
      return axios({ method: 'delete', url })
        .then(() => {
          context.commit('endLoading', null, { root: true })
          return Promise.resolve()
        })
        .catch(error => {
          context.commit('endLoading', null, { root: true })
          return Promise.reject(error)
        })
    },
    check: (context, payload) => {
      let url = `/sauTian/api/products/${payload.id}/conversionFactors/${payload.conversionFactorId}`
      return axios({ method: 'get', url })
        .then(result => Promise.resolve(result.data.data))
        .catch(error => Promise.reject(error))
    },
    fetch: (context, payload) => {
      context.commit('clearData')
      let url = '/sauTian/api/products'
      if (payload) url += `?per_page=${payload.perPage}&page=${payload.currentPage}`
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
    upload: (context, data) => {
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: '/sauTian/api/products/upload',
        data,
      }).then(() => {
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('reset')
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
    uploadStock: (context, data) => {
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: '/sauTian/api/products/uploadStock',
        data,
      }).then(() => {
        context.commit('endLoading', null, { root: true })
        return Promise.resolve()
      }).catch(error => {
        context.commit('reset')
        context.commit('endLoading', null, { root: true })
        return Promise.reject(error)
      })
    },
    upsert: (context, payload) => {
      context.commit('startLoading', null, { root: true })
      return axios({
        method: 'post',
        url: '/sauTian/api/products',
        data: {
          id: payload.conversionFactorId,
          productId: payload.id,
          conversionFactor: payload.conversionFactor,
        },
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
    },
    setLoadingState: (state, loadingState) => {
      state.loading = loadingState
    },
    updateRecord: (state, payload) => {
      let index = state.data.findIndex(dataEntry => dataEntry.id === payload.id)
      state.data[index].conversionFactorId = payload.conversionFactorId
      state.data[index].conversionFactor = payload.conversionFactor
    },
  },
  getters: {
    isLoading: state => state.loading,
    isUpdating: state => state.updating,
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
  },
}

export default products
