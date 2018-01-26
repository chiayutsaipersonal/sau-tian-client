<template>
  <li>
    <b-collapse class="panel"
                :open.sync="expanded">
      <div slot="trigger"
           class="panel-heading">
        <strong>功能模組選單</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>
            <button class="button is-info is-outlined is-small">操作說明</button> 您正在閱讀的操作說明頁面
          </li>
          <li>
            <button class="button is-info is-outlined is-small">客戶列表</button> 顯示在規定銷售區域 (AREANO: 1 ~ 4) 的客戶資料
          </li>
          <li>
            <button class="button is-info is-outlined is-small">產品列表</button> 顯示所有 POS 系統內的產品以及對應的 3M 編號以及轉換率。並可在此加以設定、修改或清除
          </li>
          <li>
            <button class="button is-info is-outlined is-small">銷售資料</button> 依設定的時間(年度/月份)查詢實際 POS 資料以及進行資料調整
          </li>
          <li>
            <button class="button is-info is-outlined is-small">寬幅檢視</button> 稍微放大資料行
          </li>
          <li>
            <button class="button is-info is-outlined is-small">窄幅檢視</button> 稍微縮小資料行
          </li>
          <li>
            <button class="button is-danger is-small">上傳轉換率</button> 清除目前所有的轉換率資料，以新檔案內容取代之
          </li>
          <li>
            <button class="button is-danger is-small">重製銷售資料</button> 清除所有選擇時段之內以及/或者選定產品項目的相關調整資料
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'NavigationMenuOverview',
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
