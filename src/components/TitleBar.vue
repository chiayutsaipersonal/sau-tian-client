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
            <option v-for="(period, index) in periods"
                    :value="index"
                    :key="index">
              {{ period }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="level-item">
        <button class="button is-medium is-info"
                disabled>
          輸出報告
        </button>
      </div>
      <div class="level-item">
        <button class="button is-medium is-danger"
                @click="confirmReload">
          重新載入 POS 系統資料
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'

import displayErrorDialog from '../mixins/displayErrorDialog'
import switchRoute from '../mixins/switchRoute'

export default {
  name: 'TitleBar',
  mixins: [
    displayErrorDialog,
    switchRoute,
  ],
  data () {
    return {
      year: null,
      selectedPeriod: 0,
      periods: [
        '1 ~ 2 月份',
        '3 ~ 4 月份',
        '5 ~ 6 月份',
        '7 ~ 8 月份',
        '9 ~ 10 月份',
        '11 ~ 12 月份',
      ],
    }
  },
  computed: {
    startMonth () { return (this.selectedPeriod * 2 + 1) },
    endMonth () { return (this.startMonth + 1) },
    startDate () { return moment(new Date(`${this.year}-${this.startMonth}-01`)).format('YYYY-MM-DD') },
    endDate () { return moment(new Date(`${this.year}-${this.endMonth}-01`)).endOf('month').format('YYYY-MM-DD') },
  },
  watch: {
    startDate () { this.$store.commit('setStartDate', this.startDate) },
    endDate () { this.$store.commit('setEndDate', this.endDate) },
  },
  mounted () {
    this.year = moment(new Date()).format('YYYY')
    this.selectedPeriod = Math.floor(parseInt(moment(new Date()).format('M')) / 2)
  },
  methods: {
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
      this.year = moment(new Date()).format('YYYY')
      this.selectedPeriod = 0
      this.switchRoute('sauTian')
      this.$store
        .dispatch('reloadPosData')
        .then(() => {
          this.$snackbar.open({
            duration: 5000,
            message: 'POS 系統資料讀取完畢，敬請繼續操作',
            type: 'is-warning',
            position: 'is-top',
            queue: false,
            actionText: 'OK',
          })
        })
        .catch(error => {
          console.log(error)
          return this.displayErrorDialog('POS 系統資料讀取失敗')
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
