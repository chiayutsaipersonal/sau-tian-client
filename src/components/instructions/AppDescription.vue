<template>
  <li>
    <b-collapse :open.sync="expanded"
                class="panel">
      <div slot="trigger"
           class="panel-heading">
        <strong>程式概述</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>使用者可以輕鬆的編修已由程式自動篩選並排列過的 POS 銷售資料。</li>
          <li>在編修資料的同時，程式會記錄所有的變更。</li>
          <li>編修資料得以無限期的保存，當然也可以刪除。</li>
          <li>當實際銷售資料變動時，因這些變動而失效的資料不需要使用者介入便會自行排除。</li>
          <li>程式能夠多台電腦開啟同時操作。</li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'AppDescription',
  data () {
    return {
      expanded: false,
    }
  },
}
</script>

<style scoped>
div.panel-block ul li {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
