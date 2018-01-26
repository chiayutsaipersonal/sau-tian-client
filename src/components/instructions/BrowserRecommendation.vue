<template>
  <li>
    <b-collapse class="panel"
                :open.sync="expanded">
      <div slot="trigger"
           class="panel-heading">
        <strong>建議程式軟體</strong>
      </div>
      <div class="panel-block">
        建議使用&nbsp;
        <b-tooltip label="點及按鈕可下載並安裝 Chrome 網頁瀏覽器"
                   class="is-info">
          <a href="https://www.google.com/chrome/browser/desktop/index.html"
             class="button is-small is-info is-outlined">
            Chrome 網路瀏覽器
          </a>
        </b-tooltip>&nbsp;進行操作
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'BrowserRecommendation',
  data () {
    return {
      expanded: false,
    }
  },
}
</script>

<style scoped>
.panel-block {
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
