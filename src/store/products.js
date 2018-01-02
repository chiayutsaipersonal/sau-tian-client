import axios from 'axios'

const products = {
  namespaced: true,
  actions: {
    fetch: (context, payload) => {
      let url = '/sauTian/api/products'
      if (payload) url += `?per_page=${payload.perPage}&page=${payload.page}`
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
    register: (state, payload) => {
      state.data = payload.data
      if (payload.pagination) {
        state.perPage = payload.pagination.perPage
        state.pageCount = payload.pagination.totalPages
        state.current = payload.pagination.currentPage
        state.recordCount = payload.pagination.totalRecords
        state.first = payload.pagination.first || null
        state.prev = payload.pagination.prev || null
        state.self = payload.pagination.self || null
        state.next = payload.pagination.next || null
        state.last = payload.pagination.last || null
      }
    },
    reset: state => {
      state.data = []
      state.loading = false
      state.perPage = null
      state.pageCount = null
      state.current = null
      state.recordCount = null
      state.first = null
      state.prev = null
      state.self = null
      state.next = null
      state.last = null
    },
    setLoadingState: (state, loadingState) => {
      state.loading = loadingState
    },
  },
  getters: {
    productData: state => state.data,
    isLoading: state => state.loading,
    paginationData: state => {
      return state.perPage ? {
        perPage: state.perPage,
        pageCount: state.pageCount,
        current: state.current,
        recordCount: state.recordCount,
        first: state.first,
        prev: state.prev,
        self: state.self,
        next: state.next,
        last: state.last,
      } : null
    },
  },
  state: {
    data: [],
    loading: false,
    perPage: null,
    pageCount: null,
    current: null,
    recordCount: null,
    first: null,
    prev: null,
    self: null,
    next: null,
    last: null,
  },
}

export default products
