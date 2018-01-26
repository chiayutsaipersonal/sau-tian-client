<template>
  <div id="home-page"
       class="has-text-left">
    <br><br>
    <div class="title is-2 is-spaced">
      系統操作說明
    </div>
    <div class="subtitle is-4">
      請 點
      <button class="button is-outlined">灰 框</button> 選 項 目 展 開 說 明
    </div>
    <hr>
    <br>
    <ol>
      <li>
        <div>
          <div class="title is-5">程 式 介 紹</div>
          <hr>
          <div>
            <ul>
              <app-description />
              <screen-size />
              <browser-recommendation />
            </ul>
          </div>
        </div>
      </li>
      <br>
      <li>
        <div>
          <div class="title is-5">操 作 介 面</div>
          <hr>
          <div>
            <ul>
              <interface-overview />
              <title-bar-overview />
              <navigation-menu-overview />
              <pagination-overview />
              <data-table-display-overview />
            </ul>
          </div>
        </div>
      </li>
      <br>
      <li>
        <div>
          <div class="title is-5">功 能 模 組</div>
          <hr>
          <div>
            <ul>
              <time-period-control />
              <instruction-page />
              <client-page />
              <product-page />
              <invoice-page />
              <system-data-sync />
              <report-generation />
            </ul>
          </div>
        </div>
      </li>
    </ol>
    <!-- <ol>
      <li>
        <div class="has-text-left">
          <div class="subtitle is-5">
            <strong>程式版面介紹</strong>
          </div>
          <ul>
            <li>程式適合以 FULL HD (1920 * 1080) 螢幕解析度之模式下操作</li>
            <li>最小於 HD (1366 * 768) 解析度操作亦可</li>
            <li>
              若感覺介面大小在以上兩種螢幕模式皆不理想，您可以按著
              <button class="button is-small is-info">
                Ctrl
              </button>
              並配合滑鼠滾動調整介面尺寸
              <br>
              <br>
              <div>
                <img src="../assets/controlInterfaceSize.png">
              </div>
            </li>
            <li>請使用
              <a href="https://www.google.com/chrome/browser/desktop/index.html"
                 class="button is-small is-info is-outlined">Chrome 網路瀏覽器</a> 進行操作
            </li>
            <li>
              請將滑鼠移至於各版面名稱上獲取敘述
            </li>
          </ul>
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
               class="mockup-pane">
            <b-tooltip label="當資料數量過多，在此可設定每頁顯示數量或者以產品分類檢視"
                       type="is-dark"
                       position="is-right"
                       multilined>
              <div> 分 頁 檢 視 控 制 </div>
            </b-tooltip>
          </div>
          <div id="mockup-content"
               class="mockup-pane">
            <b-tooltip label="在此版面檢視或編修資料"
                       type="is-dark"
                       position="is-right"
                       multilined>
              <div> 資 料 顯 示 </div>
            </b-tooltip>
          </div>
        </div>
      </li>
      <li class="has-text-left">
        <div class="subtitle is-5">
          <strong>功能模組</strong>
        </div>
        <p>
          程式主要由您目前正在閱讀的基本
          <span class="button is-info is-outlined is-small">操作說明</span> 、
          <span class="button is-info is-outlined is-small">客戶列表</span> 、
          <span class="button is-info is-outlined is-small">產品列表</span> 、以及
          <span class="button is-info is-outlined is-small">銷售資料</span>
          四個操作頁面所組成。程式可以讓使用者陸續編輯、儲存並輸出銷售資料。所有作業不會對實際的 POS 系統資料造成任何影響。
        </p>
        <ul>
          <home-page-instructions />
          <client-page-instructions />
          <product-page-instructions />
          <invoice-page-instructions />
        </ul>
      </li>
    </ol> -->
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
    'AppDescription': () => import('./instructions/AppDescription.vue'),
    'BrowserRecommendation': () => import('./instructions/BrowserRecommendation.vue'),
    'ClientPage': () => import('./instructions/ClientPage.vue'),
    'DataTableDisplayOverview': () => import('./instructions/DataTableDisplayOverview.vue'),
    'HomePageInstructions': () => import('./instructions/HomePageInstructions.vue'),
    'InstructionPage': () => import('./instructions/InstructionPage.vue'),
    'InterfaceOverview': () => import('./instructions/InterfaceOverview.vue'),
    'InvoicePage': () => import('./instructions/InvoicePage.vue'),
    'NavigationMenuOverview': () => import('./instructions/NavigationMenuOverview.vue'),
    'PaginationOverview': () => import('./instructions/PaginationOverview.vue'),
    'ProductPage': () => import('./instructions/ProductPage.vue'),
    'ReportGeneration': () => import('./instructions/ReportGeneration.vue'),
    'ScreenSize': () => import('./instructions/ScreenSize.vue'),
    'SystemDataSync': () => import('./instructions/SystemDataSync.vue'),
    'TimePeriodControl': () => import('./instructions/TimePeriodControl.vue'),
    'TitleBarOverview': () => import('./instructions/TitleBarOverview.vue'),
  },
}
</script>

<style scoped>
#home-page {
  margin-left: 0;
  margin-right: 5%;
}

ol {
  list-style: none;
}

ul {
  list-style: none;
}

li {
  margin-top: 30px;
  margin-bottom: 30px;
}

button.button {
  font-weight: bold;
  background-color: whitesmoke;
}

/*
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

img {
  border: 3px solid gray;
  border-radius: 5px;
} */
</style>
