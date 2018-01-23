<template>
  <div id="home-page">
    <h3 class="title is-3">系統操作說明 (待完成)</h3>
    <hr>
    <ol>
      <li>
        <div class="has-text-left">
          <p>
            程式適合以 FULL HD (1920 * 1080) 螢幕解析度之模式下操作，最小於 HD (1366 * 768) 解析度操作亦可。<br> 請將滑鼠移至於各版面名稱上獲取敘述
          </p>
        </div>
        <div id="layout-mockup">
          <div id="mockup-header"
               class="mockup-pane">
            <b-tooltip label="可於此設定資料擷取區間、將資料輸出以及重新讀取 POS 系統資料"
                       type="is-dark"
                       position="is-right"
                       multilined>
              標 題 列
            </b-tooltip>
          </div>
          <div id="mockup-navigation"
               class="mockup-pane">
            <b-tooltip label="可切換功能頁面，另外還有各模組的特定功能"
                       type="is-dark"
                       position="is-right"
                       multilined>
              <div class="rotated-text">
                模&nbsp;&nbsp;組&nbsp;&nbsp;控&nbsp;&nbsp;制
              </div>
            </b-tooltip>
          </div>
          <div id="mockup-pagination"
               class="mockup-pane">
            <b-tooltip label="當資料數量過多，在此可設定每頁顯示數量或者以產品分類檢視"
                       type="is-dark"
                       position="is-right"
                       multilined>
              <div>
                分 頁 檢 視 控 制
              </div>
            </b-tooltip>
          </div>
          <div id="mockup-content"
               class="mockup-pane">
            <b-tooltip label="在此版面檢視或編修資料"
                       type="is-dark"
                       position="is-right"
                       multilined>
              <div>
                資 料 顯 示
              </div>
            </b-tooltip>
          </div>
        </div>
      </li>
      <li class="has-text-left">
        <p>
          <strong>功能模組：</strong> 程式主要由您目前正在閱讀的基本
          <strong class="button is-info is-outlined is-small">操作說明</strong> 、
          <strong class="button is-info is-outlined is-small">客戶列表</strong> 、
          <strong class="button is-info is-outlined is-small">產品列表</strong> 、以及
        <strong class="button is-info is-outlined is-small">銷售資料</strong> 四個操作頁面所組成。程式可以讓使用者陸續編輯、儲存並輸出銷售資料。所有作業不會對實際的 POS 系統資料造成任何影響。</p>
        <ul>
          <li>
            <strong>系統操作說明:</strong> 簡易系統操作以及功能解說
          </li>
          <li>
            <strong>客戶列表檢視</strong>
            <ul>
              <li>
                主要用於檢視
                <strong>客戶</strong> 資料，此頁面沒有需要操作的項目
              </li>
              <li>
                顯示所有 POS 系統中，銷售區域號碼設定數值介於 1 ~ 4 的客戶
              </li>
              <li>
                若有必要
                <u>新增</u> 或
                <u>移除</u> 列表中的客戶，必須在修正 POS 資料並執行
                <strong class="button is-danger is-small">重新載入POS系統資料</strong> 或是重新啟動系統後端程式
              </li>
              <li>
                <div>
                  檢視的資料行列多寡可利用
                  <strong class="button is-info is-outlined is-small">
                    分頁檢視控制
                  </strong>
                  將資料加以分頁，方便瀏覽。
                </div>
                <br>
                <strong class="button is-info is-outlined is-small">
                  分頁檢視控制
                </strong>
                <br>
                <img src="../../static/paginationControlImage.png">
              </li>
              <li>
                可點選
                <strong class="button is-info is-outlined is-small">
                  寬幅檢視
                </strong>
                或
                <strong class="button is-info is-outlined is-small">
                  窄幅檢視
                </strong>
                將資料行列大小稍作調整
              </li>
            </ul>
          </li>
          <li>
            <strong>產品列表檢視</strong>
          </li>
          <li>
            <strong>銷售資料編輯</strong>
          </li>
        </ul>
      </li>
    </ol>
    <hr>
    <h4 class="subtitle is-4">操作說明結束</h4>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
li {
  margin-top: 15px;
  margin-bottom: 15px;
}

#layout-mockup {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 400px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "t t t t t t t t t t t t" "n n n p p p p p p p p p"
    "n n n c c c c c c c c c";
}

#mockup-header {
  grid-area: t;
  background-color: aquamarine;
  height: 40px;
}

#mockup-navigation {
  grid-area: n;
  background-color: bisque;
}

#mockup-pagination {
  grid-area: p;
  color: bisque;
  background-color: cadetblue;
  height: 40px;
}

#mockup-content {
  grid-area: c;
  color: white;
  background-color: deepskyblue;
  height: 180px;
}

.rotated-text {
  position: relative;
  left: 0px;
  bottom: -50px;
  transform: rotate(90deg);
}

.mockup-pane {
  border: 2px solid gray;
  border-radius: 5px;
}
</style>
