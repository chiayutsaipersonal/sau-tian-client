<template>
  <li>
    <b-collapse :open.sync="expanded"
                class="panel">
      <div slot="trigger"
           class="panel-heading">
        <strong>標題列以及系統控制項目</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li class="hide-bullet">
            <div>
              <img class="illustration"
                   src="../../assets/titleBar.png">
            </div>
          </li>
          <li>
            <strong>程式版本</strong>
          </li>
          <li>
            <button class="button is-small is-outlined">資料查詢區間</button> 控制資料範圍於選擇的年度以及月份之內
          </li>
          <li>
            <button class="button is-small is-info">
              輸出報告
            </button> 點選後將以要求格式進行 3M 的資料檔案下載
          </li>
          <li>
            <button class="button is-small is-danger">同步銷售資料</button> 將讀取最新的 POS 系統資料。並不影響已輸入的修改資料 (除非歷史資料有異動，則相關無效資料會自動消除)。視系統效能可能作業會進行數分鐘，請耐心等候
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'TitleBarOverview',
  data () {
    return {
      expanded: false,
    }
  },
}
</script>

<style scoped>
li.hide-bullet {
  list-style: none;
}

div.panel-block ul li {
  margin-top: 15px;
  margin-bottom: 15px;
}

img.illustration {
  width: 90%;
  border: 3px solid gray;
  border-radius: 5px;
}
</style>
