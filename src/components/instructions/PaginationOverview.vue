<template>
  <li>
    <b-collapse class="panel"
                :open.sync="expanded">
      <div slot="trigger"
           class="panel-heading">
        <strong>分頁控制</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>
            調整所顯示的資料數量: 請斟酌顯示太多資料或頻繁切換，避免低階系統操作不順暢問題
          </li>
          <li>
            分為以下兩種模式
            <ol>
              <li>
                <div>資料筆數分業模式: 僅出現於
                  <button class="button is-outlined is-info is-small">產品列表</button>&nbsp;以及&nbsp;
                <button class="button is-outlined is-info is-small">客戶列表</button>&nbsp;頁面</div>
                <br>
                <div>
                  <img class="illustration"
                       src="../../assets/recordCountPagination.png">
                </div>
              </li>
              <li>
                <div>產品篩選模式: 僅出現於
                <button class="button is-outlined is-info is-small">銷售資料</button>&nbsp;頁面</div>
                <br>
                <div>
                  <img class="illustration"
                       src="../../assets/productFilterPagination.png">
                </div>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'PaginationOverview',
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

img.illustration {
  width: 80%;
  border: 3px solid gray;
  border-radius: 5px;
}
</style>
