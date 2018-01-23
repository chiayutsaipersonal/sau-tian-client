<template>
  <div id="home-page">
    <h3 class="title is-3">系統操作說明 (待完成)</h3>
    <hr>
    <ol>
      <li>
        <div class="has-text-left">
          程式版面概述 - 適合以 FULL HD (1920 * 1080) 螢幕解析度之模式下操作，最小於 HD (1366 * 768) 解析度操作亦可
        </div>
        <div id="layout-mockup">
          <div id="mockup-header">
            <b-tooltip label="aaa">
              標題
            </b-tooltip>
          </div>
          <div id="mockup-navigation">
            <div class="rotated-text">
              模組控制
            </div>
          </div>
          <div id="mockup-pagination">分頁檢視控制</div>
          <div id="mockup-content">資料顯示</div>
        </div>
      </li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
      <li class="has-text-left">系統操作步驟</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scope>
#layout-mockup {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 400px;
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "t t t t t t t t t t t t" "n n n p p p p p p p p p"
    "n n n c c c c c c c c c";
}
#mockup-header {
  grid-area: t;
  border: 1px solid black;
  background-color: bisque;
  height: 40px;
}
#mockup-navigation {
  grid-area: n;
  border: 1px solid black;
  background-color: bisque;
}
#mockup-pagination {
  grid-area: p;
  border: 1px solid black;
  background-color: bisque;
  height: 40px;
}
#mockup-content {
  grid-area: c;
  border: 1px solid black;
  background-color: bisque;
  height: 180px;
}

.rotated-text {
  position: relative;
  left: 0px;
  bottom: -50px;
  transform: rotate(90deg);
}
</style>
