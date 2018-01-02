import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import InvoicePage from '@/components/InvoicePage'
import ClientPage from '@/components/ClientPage'
import ProductPage from '@/components/ProductPage'

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
