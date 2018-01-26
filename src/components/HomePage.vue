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
  </div>
</template>

<script>
import AppDescription from './instructions/AppDescription.vue'
import BrowserRecommendation from './instructions/BrowserRecommendation.vue'
import ClientPage from './instructions/ClientPage.vue'
import DataTableDisplayOverview from './instructions/DataTableDisplayOverview.vue'
import HomePageInstructions from './instructions/HomePageInstructions.vue'
import InstructionPage from './instructions/InstructionPage.vue'
import InterfaceOverview from './instructions/InterfaceOverview.vue'
import InvoicePage from './instructions/InvoicePage.vue'
import NavigationMenuOverview from './instructions/NavigationMenuOverview.vue'
import PaginationOverview from './instructions/PaginationOverview.vue'
import ProductPage from './instructions/ProductPage.vue'
import ReportGeneration from './instructions/ReportGeneration.vue'
import ScreenSize from './instructions/ScreenSize.vue'
import SystemDataSync from './instructions/SystemDataSync.vue'
import TimePeriodControl from './instructions/TimePeriodControl.vue'
import TitleBarOverview from './instructions/TitleBarOverview.vue'

export default {
  name: 'HomePage',
  components: {
    AppDescription,
    BrowserRecommendation,
    ClientPage,
    DataTableDisplayOverview,
    HomePageInstructions,
    InstructionPage,
    InterfaceOverview,
    InvoicePage,
    NavigationMenuOverview,
    PaginationOverview,
    ProductPage,
    ReportGeneration,
    ScreenSize,
    SystemDataSync,
    TimePeriodControl,
    TitleBarOverview,
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
</style>
