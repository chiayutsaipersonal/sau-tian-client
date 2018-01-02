<template>
  <form
    id="product-edit-form"
    method="post"
    action="/sauTian/api/products"
    @submit.prevent="updateRecord()"
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">修改產品記錄</p>
      </header>
      <section class="modal-card-body">
        <b-field
          horizontal
          label="編號"
        >
          <b-input
            type="text"
            placeholder="產品編號"
            :value="record.id"
            disabled
          />
        </b-field>

        <b-field
          horizontal
          label="品名"
        >
          <div>{{ record.name }}</div>
        </b-field>

        <b-field
          horizontal
          label="SITEMNO"
        >
          <div>{{ record.sapId||'秀田系統資料空白' }}</div>
        </b-field>

        <b-field
          horizontal
          label="3M 編號"
        >
          <b-input
            type="text"
            placeholder="請輸入 3M 編號"
            v-model="conversionFactorId"
            lazy
            required
          />
        </b-field>

        <b-field
          horizontal
          label="轉換率"
        >
          <b-input
            type="number"
            step="0.1"
            placeholder="請輸入轉換率"
            v-model="conversionFactor"
            lazy
            number
            required
          />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button"
          type="button"
          @click="$parent.close()"
        >
          放棄變更
        </button>
        <button
          type="submit"
          class="button is-primary"
        >
          上傳資料
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ProductEditForm',
  props: {
    record: { type: Object, default: () => { return {} } },
  },
  data () {
    return {
      conversionFactorId: null,
      conversionFactor: null,
    }
  },
  mounted: function () {
    this.conversionFactorId = this.record.conversionFactorId || null
    this.conversionFactor = this.record.conversionFactor || null
  },
  methods: {
    updateRecord: function () {
      return 1
    },
  },
}
</script>

<style scoped>
.modal-card {
  width: 140%;
}
</style>
