import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
// import InvoicePage from '@/components/InvoicePage'
const InvoicePage = r => require.ensure([], () => (require('@/components/InvoicePage.vue')))
// import ClientPage from '@/components/ClientPage'
const ClientPage = r => require.ensure([], () => (require('@/components/ClientPage.vue')))
// import ProductPage from '@/components/ProductPage'
const ProductPage = r => require.ensure([], () => (require('@/components/ProductPage.vue')))

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/sauTian',
    name: 'home',
    component: HomePage,
  }, {
    path: '/sauTian/invoices',
    name: 'invoices',
    component: InvoicePage,
  }, {
    path: '/sauTian/clients',
    name: 'clients',
    component: ClientPage,
  }, {
    path: '/sauTian/products',
    name: 'products',
    component: ProductPage,
  }, {
    path: '*',
    redirect: '/sauTian',
  }],
  mode: 'history',
})
