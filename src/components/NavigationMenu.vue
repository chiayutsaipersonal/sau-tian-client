<template>
  <aside id="navigation-menu">
    <button
      class="button is-outlined is-fullwidth is-medium"
      @click="switchRoute('/sauTian')"
      :disabled="this.$route.name==='home'"
    >
      系統首頁
    </button>

    <button
      class="button is-outlined is-fullwidth is-medium"
      @click="switchRoute('/sauTian/invoices')"
      disabled
    >
      銷售資料
    </button>

    <button
      class="button is-outlined is-fullwidth is-medium"
      @click="switchRoute('/sauTian/clients')"
      disabled
    >
      客戶列表
    </button>

    <button
      class="button is-outlined is-fullwidth is-medium"
      @click="switchRoute('/sauTian/products')"
      :disabled="this.$route.name==='products'"
    >
      產品列表
    </button>

    <br>

    <button
      class="button is-outlined is-fullwidth is-medium"
      :disabled="!routeDataReady"
      @click="reloadRouteData"
    >
      重新載入
    </button>

    <button
      class="button is-outlined is-fullwidth is-medium"
      disabled
    >
      輸出報告
    </button>
  </aside>
</template>

<script>
export default {
  name: 'NavigationBar',
  data () {
    return {
      labelLookup: {
        products: '產品',
        clients: '客戶',
        invoices: '銷售',
      },
    }
  },
  computed: {
    routeDataReady: function () {
      if (this.$route.name === 'home') return false
      return this.$store.state[this.$route.name].totalRecords
    },
  },
  methods: {
    reloadRouteData: function () {
      return this.$store
        .dispatch(`${this.$route.name}/fetch`, {
          perPage: this.$store.state[this.$route.name].perPage,
          currentPage: this.$store.state[this.$route.name].currentPage,
        })
        .then(() => Promise.resolve())
        .catch(error => {
          console.error(error)
          return this.$dialog.alert({
            title: '錯誤',
            message: `${this.labelLookup[this.$route.name]}資料表讀取異常`,
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa',
          })
        })
    },
    switchRoute: function (path) {
      this.$router.push(path)
    },
  },
}
</script>

<style scoped>
#navigation-menu {
  grid-column: 1 / 3;
  grid-row: 2 / -1;
  justify-self: start;
  align-self: stretch;
  padding: 0;
}

button {
  margin-top: 2px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
