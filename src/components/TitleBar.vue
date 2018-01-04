<template>
  <div
    id="title-bar"
    class="level"
  >
    <div class="level-left">
      <div class="level-item">
        <h1 class="title is-4">秀田銷售資料拋轉程式</h1>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <b-datepicker
          size="is-medium"
          placeholder="起始日期"
          icon="calendar-alt"
          :disabled="$route.name!=='invoices'"
          :month-names="monthNames"
          :readonly="false"
          v-model.lazy="startDate"
        />
        <h1 class="title is-6">&nbsp;&nbsp;至&nbsp;&nbsp;</h1>
        <b-datepicker
          size="is-medium"
          placeholder="截止日期"
          icon="calendar-alt"
          :disabled="$route.name!=='invoices'"
          :month-names="monthNames"
          :readonly="false"
          v-model.lazy="endDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  data () {
    return {
      startDate: null,
      endDate: null,
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    }
  },
}
</script>

<style scoped>
#title-bar {
  grid-column: 1 / -1;
}
</style>
