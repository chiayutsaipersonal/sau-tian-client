<template>
  <div id="invoice-page">
    <section>
      <b-table :bordered="false"
               :narrowed="narrowRecords"
               :hoverable="false"
               :mobile-cards="false"
               :loading="loading"
               :data="filteredData"
               :row-class="row => row._preserved === true ? 'is-checked' : ''">
        <template slot-scope="props">

          <b-table-column label="輸出"
                          centered>
            <b-checkbox :value="props.row._preserved"
                        :disabled="props.row.checkboxDisabled"
                        @input="processPreservationUpdate(props.row, $event)" />
          </b-table-column>

          <b-table-column label="項次"
                          centered>
            <b-tag type="is-small">
              {{ perPage * (currentPage - 1) + props.row.index }}
            </b-tag>
          </b-table-column>

          <b-table-column label="銷售日期"
                          centered>
            <b-tag type="is-small">
              {{ props.row.date }}
            </b-tag>
          </b-table-column>

          <b-table-column label="客戶">
            <div class="control">
              <b-taglist v-if="props.row.areaId"
                         attached>
                <b-tag type="is-success is-small">{{ props.row.areaId }}</b-tag>
                <b-tag type="is-warning is-small">{{ props.row.clientId }}</b-tag>
                <b-tag type="is-info is-small"> {{ props.row.companyName }} </b-tag>
              </b-taglist>
              <template v-else-if="props.row._clientId===null">
                <b-select v-if="!props.row.areaId"
                          :placeholder="`[${props.row.clientId}] ${props.row.companyName}`"
                          size="is-small"
                          @input="processClientUpdate(props.row, $event)">
                  <option v-for="client in clientList"
                          :value="client.id"
                          :key="client.id">
                    {{ client.areaId }} - 【{{ client.id }}】 {{ client.name }}
                  </option>
                </b-select>
              </template>
              <template v-else>
                <b-field grouped
                         group-multiline>
                  <div class="control">
                    <b-taglist attached>
                      <b-tag type="is-danger is-small">{{ clientLookup(props.row._clientId).areaId }}</b-tag>
                      <b-tag type="is-info is-small"
                             closable
                             @close="processClientUpdate(props.row, null)">
                        {{ clientLookup(props.row._clientId).name }}
                      </b-tag>
                    </b-taglist>
                  </div>
                  <div class="control">
                    <b-taglist attached>
                      <b-tag type="is-dark is-small">{{ props.row.clientId }}</b-tag>
                      <b-tag type="is-small">{{ props.row.companyName }}</b-tag>
                    </b-taglist>
                  </div>
                </b-field>
              </template>
            </div>
          </b-table-column>

          <b-table-column label="產品">
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-warning is-small">
                  {{ props.row.productId }}
                </b-tag>
                <b-tag type="is-info is-small">
                  {{ props.row.conversionFactorId }}
                </b-tag>
                <b-tag v-if="props.row.dept"
                       type="is-dark is-small">
                  {{ props.row.dept }}
                </b-tag>
                <b-tag type="is-small">
                  {{ props.row.productName }}
                </b-tag>
              </b-taglist>
            </div>
          </b-table-column>

          <b-table-column label="售價"
                          numeric>
            <template v-if="props.row._unitPrice!==null">
              <a class="button is-warning is-small"
                 @click="unitPricePrompt(props.row)">
                {{ props.row._unitPrice|currency }}
              </a>
              <a class="button is-success is-small"
                 @click="processUnitPriceUpdate(props.row, null)">
                原始: {{ props.row.unitPrice|currency }}
              </a>
            </template>
            <a v-else
               class="button is-success is-small"
               @click="unitPricePrompt(props.row)">
              {{ props.row.unitPrice|currency }}
            </a>
          </b-table-column>

          <b-table-column label="數量"
                          numeric>
            <template v-if="props.row._quantity!==null">
              <a class="button is-warning is-small"
                 @click="quantityPrompt(props.row)">
                {{ props.row._quantity|quantity }}
              </a>
              <a class="button is-success is-small"
                 @click="processQuantityUpdate(props.row, null)">
                原始: {{ props.row.quantity|quantity }}
              </a>
            </template>
            <a v-else
               class="button is-success is-small"
               @click="quantityPrompt(props.row)">
              {{ props.row.quantity|quantity }}
            </a>
          </b-table-column>

          <b-table-column label="單位"
                          centered>
            {{ props.row.unit }}
          </b-table-column>

          <b-table-column label="總額"
                          numeric>
            {{ props.row.workingInvoiceValue|currency }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>未發現可顯示銷售資料</p>
            </div>
          </section>
        </template>

        <template v-if="!isEmpty"
                  slot="footer">
          <th>
            <div class="th-wrap is-centered"> 輸出 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 項次 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 銷售日期 </div>
          </th>
          <th>
            <div class="th-wrap"> 客戶 </div>
          </th>
          <th>
            <div class="th-wrap"> 產品 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 售價 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 數量 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 單位 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 總額 </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import numeral from 'numeral'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'
import errorIndicator from '../mixins/errorIndicator'

export default {
  name: 'InvoicePage',
  filters: {
    currency (value) {
      if (value === null) return null
      return numeral(value).format('$ 0,0[.]00')
    },
    quantity (value) {
      if (value === null) return null
      return numeral(value).format('0,0[.]00')
    },
  },
  mixins: [displayErrorDialog, errorIndicator],
  computed: {
    ...mapState('invoices', {
      loading: 'loading',
      data: 'data',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
    }),
    ...mapState('clients', {
      clientList: 'clientList',
    }),
    ...mapState({
      startDate: 'startDate',
      endDate: 'endDate',
      narrowRecords: 'narrowRecords',
    }),
    ...mapGetters('invoices', { filteredData: 'filteredData' }),
    actualSum () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.actualInvoiceValue
      }, 0)
    },
    workingDataSum () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.workingInvoiceValue
      }, 0)
    },
    isEmpty () {
      return this.totalRecords === 0
    },
  },
  mounted () {
    if (this.isEmpty) {
      return this.getLiveData()
    }
  },
  beforeDestroy: function () {
    this.$store.commit('clients/reset')
    this.$store.commit('invoices/reset')
  },
  methods: {
    ...mapActions('clients', {
      getClientList: 'getClientList',
      getPatronList: 'getPatronList',
    }),
    ...mapActions('invoices', { fetchInvoiceData: 'fetch' }),
    ...mapMutations('invoices', {
      setClientFilter: 'setClientFilter',
      setProductFilter: 'setProductFilter',
    }),
    clientLookup (clientId) {
      if (this.clientList) {
        let result = this.clientList.filter(client => client.id === clientId)
        if (result.length === 1) {
          return result[0]
        } else {
          return { id: '錯誤', areaId: '錯誤', name: '錯誤' }
        }
      }
    },
    getLiveData () {
      this.setClientFilter(null)
      this.setProductFilter(null)
      return this.getClientList()
        .then(clientList => {
          return this.getPatronList()
        })
        .then(patronList => {
          return Promise.resolve()
        })
        .catch(error => {
          this.errorIndicator('客戶資料表讀取異常')
          return Promise.reject(error)
        })
        .then(() => {
          return this.fetchInvoiceData().catch(error => {
            this.errorIndicator('銷售資料表讀取異常')
            return Promise.reject(error)
          })
        })
        .catch(error => {
          if (error.response) console.error(error.response)
          return error.response.status && error.response.status === 503
            ? this.errorIndicator('系統尚未準備完成，請稍後再繼續資料操作')
            : this.displayErrorDialog('資料讀取失敗，無法完成銷售資料表初始化')
        })
    },
    markUnpreservedRecord (row, index) {
      return this.preservedIndexList.indexOf(row.index) === -1
        ? 'not-preserved'
        : ''
    },
    processPreservationUpdate (recordBeforeUpdate, preservationState) {
      this.$store
        .dispatch(
          'invoices/upsert',
          Object.assign({}, recordBeforeUpdate, {
            _preserved: preservationState,
          })
        )
        .catch(error => {
          console.log(error)
          return this.displayErrorDialog('更改記錄保存狀態失敗')
        })
    },
    processClientUpdate (recordBeforeUpdate, _clientId) {
      this.$store
        .dispatch(
          'invoices/upsert',
          Object.assign({}, recordBeforeUpdate, {
            _clientId: _clientId,
            _preserved: null,
          })
        )
        .catch(error => {
          console.log(error)
          return this.displayErrorDialog('更改銷售客戶失敗')
        })
    },
    unitPricePrompt (recordBeforeUpdate) {
      this.$dialog.prompt({
        message: '請輸入新單價或取消單價更新',
        inputAttrs: {
          type: 'number',
          step: '0.01',
          value: recordBeforeUpdate._unitPrice || recordBeforeUpdate.unitPrice,
        },
        onConfirm: _unitPrice => {
          switch (_unitPrice.toString()) {
            case recordBeforeUpdate._unitPrice
              ? recordBeforeUpdate._unitPrice.toString()
              : null:
              return
            case recordBeforeUpdate.unitPrice.toString():
              return this.processUnitPriceUpdate(recordBeforeUpdate, null)
            default:
              return this.processUnitPriceUpdate(recordBeforeUpdate, _unitPrice)
          }
        },
      })
    },
    processUnitPriceUpdate (recordBeforeUpdate, _unitPrice) {
      this.$store
        .dispatch(
          'invoices/upsert',
          Object.assign({}, recordBeforeUpdate, { _unitPrice: _unitPrice })
        )
        .catch(error => {
          console.log(error)
          return this.displayErrorDialog('更改售價失敗')
        })
    },
    quantityPrompt (recordBeforeUpdate) {
      this.$dialog.prompt({
        message: '請輸入新數量或取消數量更新',
        inputAttrs: {
          type: 'number',
          value: recordBeforeUpdate._quantity || recordBeforeUpdate.quantity,
        },
        onConfirm: _quantity => {
          switch (_quantity.toString()) {
            case recordBeforeUpdate._quantity
              ? recordBeforeUpdate._quantity.toString()
              : null:
              return
            case recordBeforeUpdate.quantity.toString():
              return this.processQuantityUpdate(recordBeforeUpdate, null)
            default:
              return this.processQuantityUpdate(recordBeforeUpdate, _quantity)
          }
        },
      })
    },
    processQuantityUpdate (recordBeforeUpdate, _quantity) {
      this.$store
        .dispatch(
          'invoices/upsert',
          Object.assign({}, recordBeforeUpdate, { _quantity: _quantity })
        )
        .catch(error => {
          console.log(error)
          return this.displayErrorDialog('更改銷售數量失敗')
        })
    },
  },
}
</script>

<style>
tr.is-checked {
  font-weight: bold;
  color: blue;
  background-color: aquamarine;
}
</style>
