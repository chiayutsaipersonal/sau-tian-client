import axios from 'axios'

const clients = {
  namespaced: true,
  actions: {
    fetch: (context, payload) => {
      context.commit('clearData')
      let url = '/sauTian/api/clients'
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
    getClientList: context => {
      return axios({
        method: 'get',
        url: '/sauTian/api/clients/simpleList',
      }).then(result => {
        context.commit('registerClientList', result.data.data)
        return Promise.resolve()
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    getPatronList: context => {
      return axios({
        method: 'get',
        url: `/sauTian/api/clients/monthlyPatrons?startDate=${context.rootState.startDate}&endDate=${context.rootState.endDate}`,
      }).then(result => {
        context.commit('registerPatronList', result.data.data)
        return Promise.resolve()
      }).catch(error => {
        return Promise.reject(error)
      })
    },
  },
  mutations: {
    registerClientList: (state, clientList) => { state.clientList = clientList },
    registerPatronList: (state, patronList) => { state.patronList = patronList },
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
      state.clientList = []
      state.patronList = []
    },
    setLoadingState: (state, loadingState) => {
      state.loading = loadingState
    },
  },
  getters: {},
  state: {
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
    clientList: [],
    patronList: [],
  },
}

export default clients
