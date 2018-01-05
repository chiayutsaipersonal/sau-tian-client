<template>
  <article id="product-edit-pane">
    <b-field grouped
             position="is-right">
      <b-field expanded>
        <b-input placeholder="3M 編號"
                 v-model.trim.lazy="convFactorId" />
      </b-field>
      <b-field expanded>
        <b-input type="number"
                 step="0.1"
                 min="0"
                 placeholder="轉換率"
                 v-model.number.lazy="convFactor" />
      </b-field>
      <b-field>
        <p class="control">
          <button class="button is-info"
                  :disabled="isPrestine || hasEmptyValue"
                  @click="confirmEdit">
            更新
          </button>
        </p>
      </b-field>
      <b-field>
        <p class="control">
          <button class="button is-success"
                  :disabled="!conversionFactorId"
                  @click="confirmClear">
            重置
          </button>
        </p>
      </b-field>
      <b-field>
        <p class="control">
          <button class="button is-danger"
                  @click="$emit('close', id)">
            關閉
          </button>
        </p>
      </b-field>
    </b-field>
    <template v-if="lookupResults.length > 0">
      <hr>
      <h6 class="subtitle is-6">以下產品資料記錄與新資料產生重疊，請確認無誤再點選'更新'</h6>
      <ul>
        <li v-for="(product, index) in lookupResults"
            :key="index">
          {{ index + 1 }}.【{{ product.id }}】{{ product.name }} 【SAP 編號:
          <strong>{{ product.conversionFactorId }}</strong> 轉換率:
          <strong>{{ product.conversionFactor }}</strong>】
        </li>
      </ul>
    </template>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductEditPane',
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '空白品名',
    },
    conversionFactorId: {
      type: String,
      default: null,
    },
    conversionFactor: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      convFactorId: '',
      convFactor: '',
      lookupResults: [],
    }
  },
  computed: {
    isPrestine () {
      return (
        (this.convFactorId === this.conversionFactorId) &&
        (this.convFactor === this.conversionFactor)
      )
    },
    hasEmptyValue () {
      return (
        (this.convFactorId === null) ||
        (this.convFactor === null)
      )
    },
  },
  watch: {
    convFactorId (convFactorId) {
      if (convFactorId === '') {
        this.convFactorId = null
      } else {
        return this.check({
          id: this.id,
          conversionFactorId: convFactorId,
        }).then(results => {
          this.lookupResults = results
        })
      }
    },
    convFactor (convFactor) {
      if (convFactor === '') {
        this.convFactor = null
      } else {
        if (this.convFactor !== null) this.convFactor = parseFloat(this.convFactor)
      }
    },
  },
  mounted () {
    this.convFactorId = this.conversionFactorId
    this.convFactor = this.conversionFactor
  },
  methods: {
    ...mapActions('products', { check: 'check' }),
    confirmEdit () {
      this.$dialog.confirm({
        message: `確認 "編修" 產品 【${this.id}】 ${this.name || '空白品名'} 轉換率資料？`,
        onConfirm: () => this.$emit('edit', {
          id: this.id,
          conversionFactorId: this.convFactorId,
          conversionFactor: this.convFactor,
        }),
      })
    },
    confirmClear () {
      this.$dialog.confirm({
        message: `確認 "重置" 產品 【${this.id}】 ${this.name || '空白品名'} 轉換率資料?`,
        onConfirm: () => this.$emit('clear', this.id),
      })
    },
  },
}
</script>
