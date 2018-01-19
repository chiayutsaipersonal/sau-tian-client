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
        <b-datepicker size="is-medium"
                      placeholder="起始日期"
                      icon="calendar-alt"
                      :disabled="$route.name!=='invoices'"
                      :month-names="monthNames"
                      :readonly="false"
                      v-model.lazy="startDate" />
        <h1 class="title is-6">&nbsp;&nbsp;至&nbsp;&nbsp;</h1>
        <b-datepicker size="is-medium"
                      placeholder="截止日期"
                      icon="calendar-alt"
                      :disabled="$route.name!=='invoices'"
                      :month-names="monthNames"
                      :readonly="false"
                      v-model.lazy="endDate" />
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
      startDate: null,
      endDate: null,
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    }
  },
  watch: {
    startDate () {
      this.$store.commit(
        'setStartDate',
        this.startDate
          ? moment(new Date(this.startDate)).format('YYYY-MM-DD')
          : null
      )
    },
    endDate () {
      this.$store.commit(
        'setEndDate',
        this.endDate
          ? moment(new Date(this.endDate)).format('YYYY-MM-DD')
          : null
      )
    },
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
      this.startDate = null
      this.endDate = null
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
