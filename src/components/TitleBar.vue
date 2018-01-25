<template>
  <div id="title-bar"
       class="level">
    <div class="level-left">
      <div class="level-item">
        <h3 class="title is-3">秀田銷售資料拋轉程式</h3>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <b-field position="is-right">
          <b-input type="number"
                   placeholder="檢視年度"
                   v-model="year"
                   maxlength="4"
                   size="is-medium" />
          <b-select placeholder="Select a name"
                    v-model="selectedPeriod"
                    size="is-medium">
            <option v-for="(period, index) in periodLabels"
                    :value="index"
                    :key="index">
              {{ period }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="level-item">
        <button class="button is-medium is-info"
                @click="confirmReportGeneration">
          輸出報告
        </button>
      </div>
      <div class="level-item">
        <button class="button is-medium is-danger"
                @click="confirmReload">
          同步 POS 資料
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapActions, mapMutations } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'
import errorIndicator from '../mixins/errorIndicator'
import switchRoute from '../mixins/switchRoute'

export default {
  name: 'TitleBar',
  mixins: [
    displayErrorDialog,
    errorIndicator,
    switchRoute,
  ],
  data () {
    return {
      year: null,
      selectedPeriod: 0,
      periodLabels: [
        '1 月份',
        '2 月份',
        '3 月份',
        '4 月份',
        '5 月份',
        '6 月份',
        '7 月份',
        '8 月份',
        '9 月份',
        '10 月份',
        '11 月份',
        '12 月份',
      ],
    }
  },
  computed: {
    selectedMonth () { return (this.selectedPeriod + 1) },
    startDate () { return moment(new Date(`${this.year}-${this.selectedMonth}-01`)).format('YYYY-MM-DD') },
    endDate () { return moment(new Date(this.startDate)).endOf('month').format('YYYY-MM-DD') },
  },
  watch: {
    year () {
      this.$store.commit('setStartDate', this.startDate)
      this.$store.commit('setEndDate', this.endDate)
      if (this.$route.name === 'invoices') {
        this.confirmLoadInvoiceData()
      }
    },
    selectedPeriod () {
      this.$store.commit('setStartDate', this.startDate)
      this.$store.commit('setEndDate', this.endDate)
      if (this.$route.name === 'invoices') {
        this.confirmLoadInvoiceData()
      }
    },
  },
  mounted () {
    this.resetComponentData()
  },
  methods: {
    ...mapActions('clients', { getClientList: 'getClientList' }),
    ...mapActions('invoices', { fetchInvoiceData: 'fetch' }),
    ...mapActions({ generateReport: 'generateReport' }),
    ...mapMutations('invoices', { setProductFilter: 'setProductFilter' }),
    resetComponentData () {
      this.year = moment(new Date()).format('YYYY')
      this.selectedPeriod = parseInt(moment(new Date()).format('M')) - 1
    },
    getLiveData () {
      this.setProductFilter(null)
      return this.getClientList()
        .then(clientList => {
          this.clientList = clientList
          return Promise.resolve()
        }).catch(error => {
          this.errorIndicator('客戶資料表讀取異常')
          return Promise.reject(error)
        }).then(() => {
          return this.fetchInvoiceData()
            .catch(error => {
              this.errorIndicator('銷售資料表讀取異常')
              return Promise.reject(error)
            })
        }).catch(error => {
          console.log(error)
          return this.displayErrorDialog('資料讀取失敗，無法完成銷售資料表初始化')
        })
    },
    confirmLoadInvoiceData () {
      this.$dialog.confirm({
        message: '是否重新讀取銷售資料？',
        type: 'is-info',
        hasIcon: true,
        icon: 'question-circle',
        iconPack: 'fa',
        onConfirm: () => this.getLiveData(),
      })
    },
    confirmReload () {
      this.$dialog.confirm({
        message: '<strong>程式將重新讀取最新 POS 資料，<br>請避免在讀取作業結束之前同時操作 POS 系統</strong>',
        type: 'is-info',
        hasIcon: true,
        icon: 'exclamation-circle',
        iconPack: 'fa',
        onConfirm: () => this.reloadPosData(),
      })
    },
    reloadPosData () {
      this.resetComponentData()
      this.switchRoute('sauTian')
      this.$store
        .dispatch('reloadPosData')
        .then(() => {
          this.$snackbar.open({
            duration: 3000,
            message: 'POS 系統資料讀取完畢，敬請繼續操作',
            type: 'is-warning',
            position: 'is-bottom',
            queue: false,
          })
        })
        .catch(error => {
          if (error.response) console.error(error.response)
          return error.response.status && (error.response.status === 503)
            ? this.errorIndicator('系統尚未準備完成，請稍後再繼續資料操作')
            : this.displayErrorDialog('POS 系統資料讀取失敗')
        })
    },
    confirmReportGeneration () {
      this.$dialog.confirm({
        message: `是否開始輸出 '${this.startDate}' ~ '${this.endDate}' 區間的銷售資料報告？`,
        type: 'is-info',
        hasIcon: true,
        icon: 'question-circle',
        iconPack: 'fa',
        onConfirm: () => this.reportGeneration(),
      })
    },
    reportGeneration () {
      this.switchRoute('sauTian')
      this.$toast.open({
        duration: 1000,
        message: '報表輸出作業即將開始，請稍候...',
        position: 'is-top',
        type: 'is-info',
        queue: false,
      })
      this.generateReport()
        .then(() => {
          this.$toast.open({
            duration: 3000,
            message: '報表輸出作業完成 \\\\(^.^ )//',
            position: 'is-top',
            type: 'is-info',
            queue: false,
          })
        })
        .catch(error => {
          if (error.response) console.error(error.response)
          return error.response.status && (error.response.status === 503)
            ? this.errorIndicator('系統未發現資料，請確認資料擷取區間是否正確。')
            : this.displayErrorDialog('報表輸出作業失敗 (o.O |||)')
        })
    },
  },
}
</script>

<style scoped>
#title-bar {
  grid-area: t;
}
</style>
