<template>
  <div
    id="title-bar"
    class="level"
  >
    <div class="level-left">
      <div class="level-item">
        <h1 class="title is-3">秀田銷售資料拋轉程式</h1>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        起始日期
      </div>
      <div class="level-item">
        <b-datepicker
          size="is-small"
          placeholder="輸入起始日期"
          icon="calendar-alt"
          :month-names="monthNames"
          :readonly="false"
          v-model.lazy="startDate"
        />
      </div>
      <div class="level-item">
        截止日期
      </div>
      <div class="level-item">
        <b-datepicker
          size="is-small"
          placeholder="輸入截止日期"
          icon="calendar-alt"
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
.level-right,
.level-item {
  margin-bottom: 8px;
  align-self: flex-end;
}
</style>
