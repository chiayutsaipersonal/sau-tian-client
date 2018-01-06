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
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'TitleBar',
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
}
</script>

<style scoped>
#title-bar {
  grid-area: t;
}
</style>
