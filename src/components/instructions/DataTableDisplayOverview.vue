<template>
  <li>
    <b-collapse :open.sync="expanded"
                class="panel">
      <div slot="trigger"
           class="panel-heading">
        <strong>資料顯示區</strong>
      </div>
      <div class="panel-block">
        <ul>
          <li>
            <div>客戶列表資料顯示</div>
            <br>
            <div>
              <img class="illustration"
                   src="../../assets/clientTable.png">
            </div>
          </li>
          <li>
            <div>產品列表資料顯示</div>
            <br>
            <div>
              <img class="illustration"
                   src="../../assets/productTable.png">
            </div>
          </li>
          <li>
            <div>銷售資料顯示</div>
            <br>
            <div>
              <img class="illustration"
                   src="../../assets/invoiceTable.png">
            </div>
          </li>
        </ul>
      </div>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'DataTableDisplayOverview',
  data () {
    return {
      expanded: false,
    }
  },
}
</script>

<style scoped>
div.panel-block ul li {
  list-style: none;
  margin-top: 15px;
  margin-bottom: 15px;
}

img.illustration {
  width: 80%;
  border: 3px solid gray;
  border-radius: 5px;
}
</style>
