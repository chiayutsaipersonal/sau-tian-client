<template>
  <aside id="navigation-menu">
    <button class="button is-outlined is-fullwidth is-medium"
            @click="switchRoute('/sauTian')"
            :disabled="this.$route.name==='home'">
      系統首頁
    </button>

    <button class="button is-outlined is-fullwidth is-medium"
            @click="switchRoute('/sauTian/invoices')"
            disabled>
      銷售資料
    </button>

    <button class="button is-outlined is-fullwidth is-medium"
            @click="switchRoute('/sauTian/clients')"
            :disabled="this.$route.name==='clients'">
      客戶列表
    </button>

    <button class="button is-outlined is-fullwidth is-medium"
            @click="switchRoute('/sauTian/products')"
            :disabled="this.$route.name==='products'">
      產品列表
    </button>

    <br>

    <button class="button is-outlined is-fullwidth is-medium"
            :disabled="!routeDataReady"
            @click="reloadRouteData">
      重新載入
    </button>
  </aside>
</template>

<script>
import displayErrorDialog from '../mixins/displayErrorDialog'
import routeLabel from '../mixins/routeLabel'

export default {
  name: 'NavigationBar',
  mixins: [displayErrorDialog, routeLabel],
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
          return this.displayErrorDialog(`${this.routeLabel()}資料表讀取異常`)
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
  grid-area: n;
  justify-self: center;
  align-self: start;
  padding: 20px;
}

button {
  margin-top: 2px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
