<template>
  <aside id="navigation-menu">
    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-active':$route.name==='home'}"
            @click="switchRoute('/sauTian')">
      系統首頁
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-active':$route.name==='invoices'}"
            @click="switchRoute('/sauTian/invoices')">
      銷售資料
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-active':$route.name==='clients'}"
            @click="switchRoute('/sauTian/clients')">
      客戶列表
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-active':$route.name==='products'}"
            @click="switchRoute('/sauTian/products')">
      產品列表
    </button>

    <template v-if="$route.name==='products'">
      <br>
      <b-field>
        <b-upload v-model="conversionFactorFiles"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  @input="handleConvFactorFileUpload($event)">
          <a class="button is-info is-outlined is-medium">
            <span>上傳轉換率</span>
          </a>
        </b-upload>
      </b-field>
    </template>

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
import viewLabel from '../mixins/viewLabel'

export default {
  name: 'NavigationBar',
  mixins: [displayErrorDialog, viewLabel],
  data () {
    return {
      conversionFactorFiles: [],
    }
  },
  computed: {
    routeDataReady: function () {
      if (this.$route.name === 'home') return false
      return this.$store.state[this.$route.name].totalRecords > 0
    },
  },
  methods: {
    handleConvFactorFileUpload: function (files) {
      let formData = new FormData()
      if (!files.length) return this.displayErrorDialog('未正確接獲上傳資料')
      formData.append('conversionFactors', files[0])
      this.$dialog.confirm({
        message: '確認上傳產品轉換率資料，並批次修改？<br><strong>!!! 現有資料將不被保存 !!!</strong>',
        onConfirm: () => this.$store
          .dispatch('products/upload', formData)
          .then(() => {
            this.$dialog.alert('產品轉換率批次上傳成功')
            return this.reloadRouteData()
          })
          .catch(error => {
            console.error(error)
            return this.displayErrorDialog('產品轉換率批次上傳成功')
          }),
      })
    },
    reloadRouteData: function () {
      return this.$store
        .dispatch(`${this.$route.name}/fetch`, {
          perPage: this.$store.state[this.$route.name].perPage,
          currentPage: this.$store.state[this.$route.name].currentPage,
        })
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog(`${this.viewLabel()}資料表讀取異常`)
        })
    },
    switchRoute: function (path) {
      if (this.$route.path !== path) this.$router.push(path)
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
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
