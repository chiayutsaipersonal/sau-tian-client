export default {
  methods: {
    viewLabel () {
      switch (this.$route.name) {
        case 'products':
          return '產品'
        case 'clients':
          return '客戶'
        case 'invoices':
          return '銷售'
        default:
          return '錯誤'
      }
    },
  },
}
