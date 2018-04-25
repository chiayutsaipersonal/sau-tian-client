<template>
  <li>
    <b-collapse :open.sync="expanded"
                class="panel">
      <div slot="trigger"
           class="panel-heading">
        <strong>版面概述</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>
            程式頁面概略區分為四個區塊:
            <ul>
              <li>標題列</li>
              <li>分頁檢視控制</li>
              <li>模組選單</li>
              <li>資料顯示</li>
              <li>請將滑鼠移至於各版面名稱上獲取敘述</li>
            </ul>
          </li>
          <li id="layout-mockup">
            <div id="mockup-header"
                 class="mockup-pane has-text-centered">
              <b-tooltip label="可於此設定資料擷取區間、將資料輸出以及重新讀取 POS 系統資料"
                         type="is-dark"
                         position="is-right"
                         multilined>
                標 題 列
              </b-tooltip>
            </div>
            <div id="mockup-navigation"
                 class="mockup-pane has-text-centered">
              <b-tooltip label="可切換功能頁面，另外還有各模組的特定功能"
                         type="is-dark"
                         position="is-right"
                         multilined>
                <div>
                  <span class="rotated-text">模</span>
                  <br>
                  <span class="rotated-text">組</span>
                  <br>
                  <span class="rotated-text">選</span>
                  <br>
                  <span class="rotated-text">單</span>
                </div>
              </b-tooltip>
            </div>
            <div id="mockup-pagination"
                 class="mockup-pane has-text-centered">
              <b-tooltip label="當資料數量過多，在此可設定每頁顯示數量或者以產品分類檢視"
                         type="is-dark"
                         position="is-right"
                         multilined>
                <div> 分 頁 檢 視 控 制 </div>
              </b-tooltip>
            </div>
            <div id="mockup-content"
                 class="mockup-pane has-text-centered">
              <b-tooltip label="在此版面檢視或編修資料"
                         type="is-dark"
                         position="is-right"
                         multilined>
                <div> 資 料 顯 示 </div>
              </b-tooltip>
            </div>
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'InterfaceOverview',
  data () {
    return {
      expanded: false,
    }
  },
}
</script>

<style>
#layout-mockup {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 800px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "t t t t t t t t t t t t"
    "n n n p p p p p p p p p"
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
