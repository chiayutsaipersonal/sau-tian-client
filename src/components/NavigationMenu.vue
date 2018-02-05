<template>
  <aside id="navigation-menu">
    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-focused':$route.name==='home'}"
            @click="switchRoute('/sauTian')">
      操作說明
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-focused':$route.name==='clients'}"
            @click="switchRoute('/sauTian/clients')">
      客戶列表
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-focused':$route.name==='products'}"
            @click="switchRoute('/sauTian/products')">
      產品列表
    </button>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            :class="{'is-focused':$route.name==='invoices'}"
            @click="switchRoute('/sauTian/invoices')">
      銷售資料
    </button>

    <br>

    <button v-if="$route.name==='invoices'"
            class="button is-danger is-fullwidth is-medium"
            @click="deleteCustomSalesRecord()">
      <small>重置銷售資料</small>
    </button>

    <b-upload v-if="$route.name==='products'"
              v-model="conversionFactorFiles"
              @input="handleConvFactorFileUpload($event)">
      <!-- accept=".xlsx" -->
      <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" -->
      <a class="button is-danger is-fullwidth is-medium">
        <span>
          <small>上傳轉換率</small>
        </span>
      </a>
    </b-upload>

    <b-upload v-if="$route.name==='products'"
              v-model="customStockQtyFiles"
              @input="handleCustomStockQtyFileUpload($event)">
      <!-- accept=".xlsx" -->
      <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" -->
      <a class="button is-danger is-fullwidth is-medium">
        <span>
          <small>上傳庫存量</small>
        </span>
      </a>
    </b-upload>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            v-if="$route.name!=='home'&&totalRecords>0"
            @click="switchRecordViewMode">
      <template v-if="!narrowRecords">
        窄幅檢視
      </template>
      <template v-else>
        寬幅檢視
      </template>
    </button>
  </aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'
import switchRoute from '../mixins/switchRoute'
import viewLabel from '../mixins/viewLabel'

export default {
  name: 'NavigationMenu',
  mixins: [
    displayErrorDialog,
    switchRoute,
    viewLabel,
  ],
  data () {
    return {
      conversionFactorFiles: [],
      customStockQtyFiles: [],
    }
  },
  computed: {
    ...mapState({
      narrowRecords: 'narrowRecords',
      startDate: 'startDate',
      endDate: 'endDate',
    }),
    ...mapState('invoices', { productFilter: 'productFilter' }),
    totalRecords () {
      if (this.$route.name === 'home') return null
      return this.$store.state[this.$route.name].totalRecords
    },
  },
  methods: {
    ...mapMutations({
      viewNarrowRecords: 'viewNarrowRecords',
      viewWideRecords: 'viewWideRecords',
    }),
    deleteCustomSalesRecord () {
      let message = this.productFilter === null
        ? `即將清除 '${this.startDate}' ~ '${this.endDate}' 之間的客製銷售資料，請【確認】或【取消】！！！`
        : `即將清除 '${this.startDate}' ~ '${this.endDate}' 之間並且相關產品 ID: '${this.productFilter}'的客製銷售資料，請【確認】或【取消】！！！`
      this.$dialog.confirm({
        message,
        onConfirm: () => {
          this.switchRoute('/sauTian')
          this.$store
            .dispatch('invoices/delete', this.productFilter)
            .then(() => this.$dialog.alert('客製銷售資料清除完畢'))
            .catch(error => {
              console.error(error)
              return this.displayErrorDialog('客製銷售資料清除作業失敗')
            })
        },
      })
    },
    handleConvFactorFileUpload (files) {
      // console.log(files)
      let fileNameParts = files[0].name.split('.')
      let hasExcelExt = (fileNameParts[fileNameParts.length - 1] === 'xls') || (fileNameParts[fileNameParts.length - 1] === 'xlsx')
      if (!hasExcelExt) return this.displayErrorDialog('僅接受 .xls 或 .xlsx 檔案')
      if (!files.length) return this.displayErrorDialog('未正確接獲上傳資料')
      let formData = new FormData()
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
            return this.displayErrorDialog('產品轉換率批次上傳失敗')
          }),
      })
    },
    handleCustomStockQtyFileUpload (files) {
      // console.log(files)
      let fileNameParts = files[0].name.split('.')
      let hasExcelExt = (fileNameParts[fileNameParts.length - 1] === 'xls') || (fileNameParts[fileNameParts.length - 1] === 'xlsx')
      if (!hasExcelExt) return this.displayErrorDialog('僅接受 .xls 或 .xlsx 檔案')
      if (!files.length) return this.displayErrorDialog('未正確接獲上傳資料')
      let formData = new FormData()
      formData.append('customStockQuantities', files[0])
      this.$dialog.confirm({
        message: '確認上傳產品庫存量資料，並批次修改？<br><strong>!!! 現有資料將不被保存 !!!</strong>',
        onConfirm: () => this.$store
          .dispatch('products/uploadStock', formData)
          .then(() => {
            this.$dialog.alert('產品庫存量批次上傳成功')
            return this.reloadRouteData()
          })
          .catch(error => {
            console.error(error)
            return this.displayErrorDialog('產品庫存量批次上傳失敗')
          }),
      })
    },
    reloadRouteData () {
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
    switchRecordViewMode () {
      if (this.narrowRecords) {
        this.viewWideRecords()
      } else {
        this.viewNarrowRecords()
      }
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

button,
a.button {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
