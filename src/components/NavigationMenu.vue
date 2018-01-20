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

    <br>

    <button v-if="$route.name==='invoices'"
            class="button is-danger is-fullwidth is-medium"
            @click="deleteCustomSalesRecord()">
      <small>重置銷售資料</small>
    </button>

    <b-upload v-if="$route.name==='products'"
              v-model="conversionFactorFiles"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              @input="handleConvFactorFileUpload($event)">
      <a class="button is-danger is-fullwidth is-medium">
        <span>
          <small>上傳轉換率</small>
        </span>
      </a>
    </b-upload>

    <button class="button is-info is-outlined is-fullwidth is-medium"
            v-if="$route.name!=='home'"
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
  name: 'NavigationBar',
  mixins: [
    displayErrorDialog,
    switchRoute,
    viewLabel,
  ],
  data () {
    return {
      conversionFactorFiles: [],
    }
  },
  computed: {
    ...mapState({
      narrowRecords: 'narrowRecords',
      startDate: 'startDate',
      endDate: 'endDate',
    }),
  },
  methods: {
    ...mapMutations({
      viewNarrowRecords: 'viewNarrowRecords',
      viewWideRecords: 'viewWideRecords',
    }),
    deleteCustomSalesRecord () {
      this.$dialog.confirm({
        message: `即將清除 '${this.startDate}' ~ '${this.endDate}' 之間的客製銷售資料<br>請確認！！！`,
        onConfirm: () => {
          this.switchRoute('/sauTian')
          this.$store
            .dispatch('invoices/delete')
            .then(() => this.$dialog.alert('客製銷售資料清除完畢'))
            .catch(error => {
              console.error(error)
              return this.displayErrorDialog('產品轉換率批次上傳成功')
            })
        },
      })
    },
    handleConvFactorFileUpload (files) {
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

button {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
