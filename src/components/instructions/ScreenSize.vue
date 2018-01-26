<template>
  <li>
    <b-collapse class="panel"
                :open.sync="expanded">
      <div slot="trigger"
           class="panel-heading">
        <strong>建議操作螢幕規格</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>
            適合以 1366 * 768 以上的解析度操作。若介面大小仍不理想，也可以按著&nbsp;
            <button class="button is-small is-outlined">CTRL</button>&nbsp;以及&nbsp;
            <button class="button is-small is-outlined">+</button>&nbsp;或&nbsp;
            <button class="button is-small is-outlined">-</button>&nbsp;調整網頁大小。最佳資料檢視模式為 FULLHD (1920 * 1080) 解析度。請比較下列相同頁面，請注意到 FULLHD 模式之下，資料雖然字體較小，但是排列整齊較方便閱讀。
          </li>
          <li>
            <div>HD (1366 * 768)</div>
            <img class="illustration"
                 src="../../assets/displayUnderHdMode.png">
          </li>
          <li>
            <div>FULLHD (1920 * 1080)</div>
            <img class="illustration"
                 src="../../assets/displayUnderFullHdMode.png">
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'ScreenSize',
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
  width: 60%;
  border: 3px solid gray;
  border-radius: 5px;
}
</style>
